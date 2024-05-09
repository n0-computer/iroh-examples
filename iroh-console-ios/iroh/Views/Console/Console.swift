import SwiftUI
import IrohLib

struct Console: View {
  @EnvironmentObject var sessionInfo: UserSession
  @EnvironmentObject var nodeManager: IrohNodeManager
  
  @State private var path = NavigationPath()
  @State var doc: Doc? = nil
  @State var entries: [HashableEntry]? = nil
  
  enum Field {
    case key
    case value
  }
  @State var key: String = ""
  @State var value: String = ""
  @FocusState private var focusedField: Field?

  @State private var image: UIImage? = nil
  @State private var isImagePickerDisplaying: Bool = false
  @State private var imageBytes: Data? = nil
  @State private var showingInvite: Bool = false

  var body: some View {
    NavigationStack(path: $path) {
      Group {
        if doc == nil {
          PickDocument(join: self.join, setDoc: { (doc) -> () in
            self.doc = doc
            do {
              try self.doc?.subscribe(cb: EventHandler(cb: self.update))
            } catch (let failure) {
              print("error subscribing to new doc: \(failure)")
            }
          })
        } else {
          VStack{
            Text(doc?.id().trunc(length: 15) ?? "")
            HStack{
              Button("Leave") {
                self.leave()
              }
              Spacer()
              Button("Invite") {
                showingInvite = true
              }.popover(isPresented: $showingInvite, content: {
                ShareDoc(doc: doc!, done: { () -> () in
                  showingInvite = false
                })
              })
            }
            Group {
              List {
                Section("Entries") {
                  if let entries = entries {
                    ForEach(entries) { entry in
                      NavigationLink(destination: DocEntry(doc: doc!, entry: entry), label: {
                        Text(entry.key)
                          .font(Font.custom("Space Mono", size: 14))
                      })
                    }
                  }
                }
              }
              .listStyle(PlainListStyle())  // or .listStyle(PlainListStyle())
              .background(Color(UIColor.systemBackground)) // for light/dark mode compatibility
              HStack {
                VStack {
                  TextField("key", text: $key)
                    .autocapitalization(.none)
                    .overlay(
                      Rectangle()
                        .frame(height: 1)
                        .foregroundColor(.gray),
                      alignment: .bottom
                    )
                    .focused($focusedField, equals: Field.key)
                    .submitLabel(.next)
                  TextField("value", text: $value)
                    .autocapitalization(.none)
                    .focused($focusedField, equals: Field.value)
                    .submitLabel(.send)
                }
                .background(
                  RoundedRectangle(cornerRadius: 4) // Rounded corners with radius 8
                  .stroke(Color.gray, lineWidth: 1) // 1px gray border
                )
                .onSubmit {
                  switch focusedField {
                  case .key:
                    focusedField = .value
                  default:
                    self.setTextEntry(key: key, value: value)
                  }
                }
                Button("PUT Text") {
                  self.setTextEntry(key: key, value: value)
                }
              }
              Button("Take Photo") {
                self.isImagePickerDisplaying = true
              }
              Button("Set Photo Entry") {
                self.setPhotoEntry(key: key)
              }
              .disabled(imageBytes == nil)
            }
            .onAppear(perform: UIApplication.shared.handleKeyboard)
          }
        }
      }
    }
    .padding()
    .sheet(isPresented: $isImagePickerDisplaying, content: {
      ImagePicker(image: $image, onDismiss: { image in
        if let image = image {
          imageBytes = image.jpegData(compressionQuality: 0.85)
        }
      })
    })
  }

  func join(_ ticket: String) {
    if let node = nodeManager.node {
      DispatchQueue.main.async {
        do {
          let docTicket = ticket.trimmingCharacters(in: .whitespacesAndNewlines)
          self.doc = try node.docJoin(ticket: docTicket)
        } catch {
          print("no document :(")
          return
        }
        
        DispatchQueue.global(qos: .default).async {
          do {
            try self.doc?.subscribe(cb: EventHandler(cb: self.update))
          } catch (let failure) {
            print("error subscribing to doc events: \(failure)")
            return
          }
        }
        
        DispatchQueue.global(qos: .utility).asyncAfter(deadline: .now() + 1) {
          self.update()
        }
      }
    }
  }

  func leave() {
    do {
      try doc?.close()
      doc = nil
      entries = nil
    } catch {
      print("couldn't stop syncing: \(error)")
    }
  }

  func setTextEntry(key: String, value: String) {
      guard let doc = self.doc else {
          print("Error: no doc")
          return
      }
      guard let author = self.nodeManager.author else {
          print("Error: no author")
          return
      }
      let _ = try! doc.setBytes(author: author, key: key.data(using: .utf8)!, value: value.data(using: .utf8)!)
      print("DOC SET: \(key): \(value)")
      resetInputFields()
  }

  func setPhotoEntry(key: String) {
    let suffixedKey = ensureJPGSuffix(for: key)
    guard let doc = self.doc else {
      return
    }
    guard let author = self.nodeManager.author else {
      return
    }
    let _ = try! doc.setBytes(author: author, key: suffixedKey.data(using: .utf8)!, value: imageBytes!)
    print("DOC SET: \(key): <image bytes>")
    resetInputFields()
  }

  func update() {
    DispatchQueue.global(qos: .utility).async {
      guard let doc = self.doc else {
        return
      }
      do {
        let query = Query.all(opts: QueryOptions(sortBy: SortBy.authorKey, direction: SortDirection.asc, offset: 0, limit: 1000))
        let entries = try doc.getMany(query: query)
        
        let mapped = entries.map { (entry) -> HashableEntry in
          let author = entry.author().toString()
          let k = String(decoding: entry.key(), as: UTF8.self)

          return HashableEntry(
            id: author + k,
            key: k,
            authorId: author,
            hash: entry.contentHash(),
            entry: entry
          )
        }
        
        DispatchQueue.main.async {
          self.entries = mapped
        }
      } catch {
        
      }
    }
  }

  func ensureJPGSuffix(for key: String) -> String {
      if key.hasSuffix(".jpg") {
          return key
      } else {
          return "\(key).jpg"
      }
  }
  
  func resetInputFields() {
    key = ""
    value = ""
    image = nil
    imageBytes = nil
    focusedField = nil
  }
}

class EventHandler: SubscribeCallback {
    var cb: () -> Void
  
    init(cb: @escaping () -> Void) {
      self.cb = cb
    }
  
    func event(event: LiveEvent) throws {
//        print("got event: \(event)")
        cb()
    }
}

struct HashableEntry: Identifiable, Equatable {
  var id: String
  var key : String
  var authorId: String
  var hash: Hash
  var entry: Entry
  
  static func == (lhs: HashableEntry, rhs: HashableEntry) -> Bool {
    lhs.id == rhs.id
  }
}

struct Console_Previews: PreviewProvider {
  static var previews: some View {
      let session = UserSession()
      Console()
        .environmentObject(session)
        .environmentObject(IrohNodeManager.shared)
        .onAppear() {
          IrohNodeManager.shared.start()
        }
  }
}
