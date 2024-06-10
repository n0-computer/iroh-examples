//
//  PickDocument.swift
//  IrohApp
//
//  Created by Brendan O'Brien on 9/14/23.
//

import SwiftUI
import IrohLib
import CodeScanner

struct PickDocument: View {
  @EnvironmentObject var nodeManager: IrohNodeManager
  @EnvironmentObject var sessionInfo: UserSession
  @State private var ticketString: String = ""
  @State private var showingCreateActionSheet: Bool = false
  @State private var showingQRScanner: Bool = false
  let join: (_ ticket: String) -> ()
  let setDoc: (_ doc: Doc) -> ()
  
  var scannerSheet: some View {
    CodeScannerView(
      codeTypes: [.qr],
      completion: { result in
        if case let .success(code) = result {
          self.ticketString = code.string
          self.showingQRScanner = false
        }
      })
  }
  
  var body: some View {
    VStack(spacing: 5) {
      VStack {
        Text("Console")
          .font(Font.custom("Space Mono", size: 32))
          .foregroundColor(.primary)
          .frame(maxWidth: .infinity, alignment: .leading)
        Text("choose a document to get started")
          .font(Font.custom("Space Mono", size: 14))
          .foregroundColor(.secondary)
          .frame(maxWidth: .infinity, alignment: .leading)
      }.padding(EdgeInsets(top: 0, leading: 20, bottom: 10, trailing: 20))
      
      
      List {
        if let node = nodeManager.node {
          Section("local docs") {
            
          }
        }
        
        if let docs = sessionInfo.documents {
          Section("iroh.network") {
            ForEach(docs, id: \.self) { doc in
              Button(doc.doc_id.trunc(length: 20)) {
//                self.join(doc.ticket)
              }
              .font(Font.custom("Space Mono", size: 16))
              .foregroundColor(.accentColor)
            }
          }
        }
      }
      .listStyle(PlainListStyle())  // or .listStyle(PlainListStyle())
      .background(Color(UIColor.systemBackground)) // for light/dark mode compatibility

      HStack{
        TextField("Paste Ticket", text: $ticketString, axis: .vertical)
          .textFieldStyle(.roundedBorder)
          .padding()
        Button("Join") {
          self.join(ticketString)
        }

        Button {
          showingQRScanner = true
        } label: {
          Image(systemName: "qrcode.viewfinder")
        }
        .sheet(isPresented: $showingQRScanner) {
          self.scannerSheet
        }
      }
      Button(action: {
        showingCreateActionSheet = true
      }, label: {
        Text("New Document")
      })
    }
    .popover(isPresented: $showingCreateActionSheet, content: {
      NewDoc(setDoc: self.setDoc)
    })
  }
}
