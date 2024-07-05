//
//  JoinDocSyncTest.swift
//  IrohApp
//
//  Created by Brendan O'Brien on 8/9/23.
//
//
import SwiftUI
import IrohLib

struct JoinDocSyncTest: View {
    @EnvironmentObject var irohNodeManager: IrohNodeManager
    @State private var ticketString: String = ""
    @State private var contentList: String = "No document joined"


    var body: some View {
        VStack {
          TextField("Enter Doc Ticket", text: $ticketString)
          Button("Join Doc") {
          }
          Text("Current Document: \(contentList)")
        }
        .padding()
    }

    func join() {
        print("joining \(ticketString)")
        let _ = try! irohNodeManager.node?.docJoin(ticket: ticketString)
        for _ in 1...5 {
            DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
//                let content = try! doc?.all()
                //            print("got \(content.count) elements for \(doc?.id())")
                
                //            let formattedList = content.map { (entry) -> String in
                //              let content: String = {
                //                do {
                //                  let c = try! doc.getContentBytes(entry: entry)
                //                  return String(decoding: c, as: UTF8.self)
                //                } catch {
                //                  return "N/A"
                //                }
                //              }()
                //              let key = String(decoding: entry.key(), as: UTF8.self)
                //              let author_s = entry.author().toString()
                //              return "Author: \(author_s) wrote '\(key)' -> '\(content)'"
                //            }.joined(separator: "\n")
                //            contentList = "\(doc.id()) (\(content.count))\n\n\(formattedList)"
            }
        }
    }
}

struct JoinDocSyncTest_Previews: PreviewProvider {
    static var previews: some View {
        let inm = IrohNodeManager.shared
        JoinDocSyncTest()
            .environmentObject(inm)
            .onAppear() {
                inm.start()
            }
    }
}

//import SwiftUI
//import IrohLib
//
//struct JoinDocSyncTest: View {
//  @State var state: IrohNode
//  @State private var ticketString: String = ""
//  @State private var contentList: String = "No document joined"
//  @State var currentDoc: Doc?
//
//  var body: some View {
//    let peer_id = state.peerId()
//    /*let doc = try! state.createDoc()
//     let doc_id = doc.id()
//     let doc_ticket = try! doc.shareWrite()
//     let doc_ticket_string = doc_ticket.toString()
//
//     let author = try! state.createAuthor()
//     //print("created author: \(author.toString())")
//
//     let hello_entry = try! doc.setBytes(
//     author: author,
//     key: "hello".data,
//     value: "world".data
//     )
//     let world_entry = try! doc.setBytes(
//     author: author,
//     key: "world".data,
//     value: "foo".data
//     )
//     let _ = print("inserted two items")
//     let list = try! doc.latest()
//     let _ = print("got \(list.count) items")
//
//     let content_list = list.map { (entry) -> String in
//     let content = String(decoding: try! doc.getContentBytes(entry: entry), as: UTF8.self)
//     let _ = print("got content \(content)")
//     let key = String(decoding: entry.key(), as: UTF8.self)
//     let author_s = entry.author().toString()
//     let _ = print("for key\(key)")
//     let _ = print("and author \(author_s)")
//     return "Author: \(author_s) wrote '\(key)' -> '\(content)'"
//     }
//
//     let list_print = content_list.joined(separator: ", ")
//
//     let stats = try! state.stats()
//     let stats_print = stats.map { "\($0.key): \($0.value)"}.joined(separator: "\n")
//     let _ = print("Stats:\n\(stats_print)")
//     */
//
//    VStack {
//      Text("Hello \(peer_id)")
//      TextField("Enter Doc Ticket", text: $ticketString)
//      Button("Join Doc") {
//        join()
//      }
//      Text("Current Document: \(contentList)")
//    }
//    .padding()
//  }
//
//  init() throws {
//    _state = .init(wrappedValue: try IrohNode())
//    let _ = print("Starting..")
//
//    let peer_id = state.peerId()
//    let _ = print("created iroh node \(state) with peer id \(peer_id)")
//  }
//
//  func join() {
//    print("joining \(ticketString)")
//    let docTicket = try! DocTicket.fromString(content: ticketString)
//    let doc = try! state.importDoc(ticket: docTicket)
//    try! doc.subscribe(cb: CallbackHandler(view: self))
//    currentDoc = doc
//
//    DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
//      try! loadContent()
//    }
//  }
//
//  func loadContent() throws {
//    if let doc = currentDoc {
//      let content = try doc.latest()
//      print("got \(content.count) elements for \(doc.id())")
//
//      let formattedList = content.map { (entry) -> String in
//        let content: String = {
//          do {
//            let c = try doc.getContentBytes(entry: entry)
//            return String(decoding: c, as: UTF8.self)
//          } catch {
//            return "N/A"
//          }
//        }()
//        let key = String(decoding: entry.key(), as: UTF8.self)
//        let author_s = entry.author().toString()
//        return "Author: \(author_s) wrote '\(key)' -> '\(content)'"
//      }.joined(separator: "\n")
//      contentList = "\(doc.id()) (\(content.count))\n\n\(formattedList)"
//    }
//  }
//}
//
//class CallbackHandler: SubscribeCallback {
//  @State private var view: JoinDocSyncTest
//
//  init(view: JoinDocSyncTest) {
//    self.view = view
//  }
//
//  func event(event: LiveEvent) throws {
//    let _ = print("got event \(event)")
//    try! view.loadContent()
//  }
//}
//
//struct JoinDocSyncTest_Previews: PreviewProvider {
//    static var previews: some View {
//      try! JoinDocSyncTest()
//    }
//}
//
//extension StringProtocol {
//    var data: Data { .init(utf8) }
//    var bytes: [UInt8] { .init(utf8) }
//}
