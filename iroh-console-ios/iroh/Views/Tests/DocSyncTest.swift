//
//  DocSyncTest.swift
//  iroh
//
//  Created by Brendan O'Brien on 7/26/23.
//

import SwiftUI
import IrohLib

struct DocSyncTest: View {
    @EnvironmentObject var nodeManager: IrohNodeManager
    @State private var ticketString: String = ""
    @State private var contentList: String = "No document joined"
    @State var currentDoc: Doc?

    @State private var events: [DocEvent] = []
    @State private var currentIndex: Int = 0
    @State private var countdownSeconds: Int = 3
    @State private var countdownTimer: Timer? = nil
    @State private var timer: Timer? = nil
    @State private var mode: testMode = .countdown
    
    @State private var relayedPeers: Int = 0
    @State private var directPeers: Int = 0
    @State private var writes: Int = 0
    @State private var messages: Int = 0
    @State private var entries: Int = 0
    @State private var errors: Int = 0
    
    private func formatDate(date: Date) -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "HH:mm:ss"
        dateFormatter.locale = Locale(identifier: "en_US_POSIX")
        return dateFormatter.string(from: date)
    }
    
    func join() {
      if let node = nodeManager.node {
        print("joining \(ticketString)")
        let doc = try! node.docJoin(ticket: ticketString)
        try! doc.subscribe(cb: CallbackHandler(view: self))
        currentDoc = doc
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
          try! loadContent()
        }
      }
    }
    
    func loadContent() throws {
//      if let doc = currentDoc {
//        let content = try doc.getMany(filter: GetFilter.all())
//        print("got \(content.count) elements for \(doc.id())")
//        
//        let formattedList = content.map { (entry) -> String in
//          let content: String = {
//            do {
//              let c = try doc.getContentBytes(entry: entry)
//              return String(decoding: c, as: UTF8.self)
//            } catch {
//              return "N/A"
//            }
//          }()
//          let key = String(decoding: entry.key(), as: UTF8.self)
//          let author_s = entry.author().toString()
//          return "Author: \(author_s) wrote '\(key)' -> '\(content)'"
//        }.joined(separator: "\n")
//        contentList = "\(doc.id()) (\(content.count))\n\n\(formattedList)"
//      }
    }
    
    private func startCountdown() {
        countdownTimer =  Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { _ in
            if countdownSeconds > 0 {
                countdownSeconds = countdownSeconds - 1
            } else {
                switch mode {
                case .countdown:
                    mode = .running
                    countdownSeconds = 30
                    startTimer()
                case .running:
                    mode = .complete
                case .complete:
                    countdownTimer?.invalidate()
                    countdownTimer = nil
                }
            }
        }
    }

    private func startTimer() {
        timer = Timer.scheduledTimer(withTimeInterval: randomInterval(), repeats: true) { _ in
            if currentIndex < mockDocEvents.count {
                var event = mockDocEvents[currentIndex]
                event.ts = Date()
                switch event.tipe {
                case .DocumentCreated:
                    messages += 1
                case .YouSetKey:
                    entries += 1
                    writes += 1
                case .YouDeletedKey:
                    entries -= 1
                case .PeerJoined:
                    messages += 3
                    directPeers += 1
                case .PeerLeft:
                    messages += 1
                    directPeers -= 1
                case .PeerSetKey:
                    entries += 1
                    messages += 1
                case .PeerDeletedKey:
                    messages += 1
                    entries -= 1
                case .Error:
                    errors += 1
                    messages += 1
                }
                events.append(event)
                currentIndex += 1
            } else {
                stopTimer()
            }
        }
    }

    private func stopTimer() {
        timer?.invalidate()
        timer = nil
    }

    private func randomInterval() -> TimeInterval {
        let randomSeconds = Double.random(in: 0.001...0.1)
        return randomSeconds
    }
    
  var body: some View {
      Group {
          if countdownSeconds > 0 && mode == .countdown {
              VStack {
                  Spacer()
                  Text("\(countdownSeconds)")
                      .font(Font.custom("Space Grotesk", size: 130).weight(.bold))
                      .foregroundColor(Color(red: 0.42, green: 0.42, blue: 0.85))
                      .frame(maxWidth: .infinity, alignment: .center)
                  Spacer()
              }
              .background(Color(red: 0.13, green: 0.15, blue: 0.20).opacity(0.92))
              .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity, alignment: .topLeading)
          } else {
              VStack(alignment: .leading, spacing: 10) {
                  VStack(alignment: .leading, spacing: 0) {
                      Text("Test One")
                          .font(Font.custom("Space Grotesk", size: 32).weight(.bold))
                          .lineSpacing(48)
                          .foregroundColor(.primary)
                      Text("doc sync test")
                          .font(Font.custom("Space Mono", size: 16))
                          .lineSpacing(23)
                          .foregroundColor(.secondary)
                  }
                  .padding(20)
                  
                  VStack(spacing: 10) {
                      Group {
                          if countdownSeconds > 0 {
                              Text("00:" + String(format: "%02d", countdownSeconds))
                                  .font(Font.custom("Space Grotesk", size: 24).weight(.bold))
                                  .lineSpacing(34)
                                  .foregroundColor(Color(red: 0.42, green: 0.42, blue: 0.85))
                          } else {
                              Text("complete")
                                  .font(Font.custom("Space Grotesk", size: 24).weight(.bold))
                                  .lineSpacing(34)
                                  .foregroundColor(Color(red: 0.42, green: 0.42, blue: 0.85))
                          }
                      }
                      Text("TIME REMAINING")
                          .font(Font.custom("Space Mono", size: 12))
                          .foregroundColor(.secondary)
                  }
                  .padding(EdgeInsets(top: 0, leading: 5, bottom: 0, trailing: 5))
                  .frame(width: 350, height: 87)
                  
                  HStack(alignment: .top, spacing: 10) {
                      VStack(spacing: 10) {
                          Text("\(writes)")
                              .font(Font.custom("Space Grotesk", size: 24).weight(.bold))
                              .lineSpacing(34)
                              .foregroundColor(Color(red: 0.14, green: 0.16, blue: 0.20))
                          Text("WRITES")
                              .font(Font.custom("Space Mono", size: 12))
                              .foregroundColor(.secondary)
                      }
                      .padding(EdgeInsets(top: 0, leading: 5, bottom: 0, trailing: 5))
                      .frame(width: 160)
                      VStack(spacing: 10) {
                          Text("\(entries)")
                              .font(Font.custom("Space Grotesk", size: 24).weight(.bold))
                              .lineSpacing(34)
                              .foregroundColor(Color(red: 0.14, green: 0.16, blue: 0.20))
                          Text("ENTRIES")
                              .font(Font.custom("Space Mono", size: 12))
                              .foregroundColor(.secondary)
                      }
                      .padding(EdgeInsets(top: 0, leading: 5, bottom: 0, trailing: 5))
                      .frame(width: 160)
                  }
                  .frame(maxWidth: .infinity)
                  
                  HStack(alignment: .top, spacing: 10) {
                      VStack(spacing: 10) {
                          Text("\(messages)")
                              .font(Font.custom("Space Grotesk", size: 24).weight(.bold))
                              .lineSpacing(34)
                              .foregroundColor(Color(red: 0.14, green: 0.16, blue: 0.20))
                          Text("MESSAGES")
                              .font(Font.custom("Space Mono", size: 12))
                              .foregroundColor(.secondary)
                      }
                      .padding(EdgeInsets(top: 0, leading: 5, bottom: 0, trailing: 5))
                      .frame(width: 160)
                      VStack(spacing: 10) {
                          Text("\(errors)")
                              .font(Font.custom("Space Mono", size: 24).weight(.bold))
                              .foregroundColor(Color(red: 0.14, green: 0.16, blue: 0.20))
                          Text("ERRORS")
                              .font(Font.custom("Space Mono", size: 12))
                              .foregroundColor(.secondary)
                      }
                      .padding(EdgeInsets(top: 0, leading: 5, bottom: 0, trailing: 5))
                      .frame(width: 160)
                  }
                  .frame(maxWidth: .infinity)
                  
                  VStack(alignment: .leading) {
                      Text("\(relayedPeers + directPeers) Connected Peers")
                          .font(Font.custom("Space Grotesk", size: 20).weight(.bold))
                          .foregroundColor(.primary)
                      Text("\(relayedPeers) relayed | \(directPeers) direct")
                          .font(Font.custom("Space Mono", size: 12))
                          .foregroundColor(.secondary)
                  }
                  .padding(EdgeInsets(top: 20, leading: 20, bottom: 0, trailing: 0))
                  
                  Text("Event Log")
                      .font(Font.custom("Space Grotesk", size: 15).weight(.light))
                      .lineSpacing(22)
                      .padding(EdgeInsets(top: 20, leading: 20, bottom: 0, trailing: 0))
                      .foregroundColor(.primary)
                  List(events, id: \.self) { event in
                      HStack {
                          Text(formatDate(date: event.ts))
                              .font(Font.custom("Space Grotesk", size: 12).weight(.light))
                              .foregroundColor(.secondary)
                          Text("\(event.tipe.rawValue)")
                              .font(Font.custom("Space Grotesk", size: 12).weight(.light))
                              .foregroundColor(.primary)
                      }
                  }
              }.frame(maxWidth: .infinity, maxHeight: .infinity)
          }
      }
      .onAppear {
          startCountdown()
      }
      .onDisappear {
          stopTimer()
      }
    }
}

enum testMode {
    case countdown
    case running
    case complete
}

class CallbackHandler: SubscribeCallback {
  @State private var view: DocSyncTest
  
  init(view: DocSyncTest) {
    self.view = view
  }
  
  func event(event: LiveEvent) throws {
//    let _ = print("got event \(event)")
    try! view.loadContent()
  }
}

extension StringProtocol {
    var data: Data { .init(utf8) }
    var bytes: [UInt8] { .init(utf8) }
}

struct DocSyncTest_Previews: PreviewProvider {
  static var previews: some View {
    DocSyncTest()
      .environmentObject(IrohNodeManager.shared)
      .onAppear() {
        IrohNodeManager.shared.start()
      }
  }
}
