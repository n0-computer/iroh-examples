//
//  NewDoc.swift
//  IrohConsole
//
//  Created by Brendan O'Brien on 9/21/23.
//

import SwiftUI
import IrohLib

struct NewDoc: View {
    @EnvironmentObject var nodeManager: IrohNodeManager
    @EnvironmentObject var sessionInfo: UserSession
    var setDoc: (_ doc: Doc) -> ()

    var body: some View {
      VStack(alignment: .leading, spacing: 10) {
        if let node = nodeManager.node {
          Button(action: {
            do {
              let doc = try node.docCreate()
              setDoc(doc)
            } catch (let failure) {
              print("couldn't create doc \(failure.localizedDescription)")
            }
          }, label: {
            VStack(alignment: .leading, spacing: 10){
              Text("New Local Doc")
                .font(Font.custom("Space Mono", size: 24))
                .foregroundColor(.accentColor)
              Text("create document on this device")
                .font(Font.custom("Space Mono", size: 14))
                .foregroundColor(.secondary)
            }
            .background(Color.init(uiColor: UIColor(red: 202, green: 201, blue: 255, alpha: 1)))
            .cornerRadius(3.0)
            .padding(10)
            .frame(maxWidth: .infinity, alignment: .leading)
          })
          
          if sessionInfo.anchorName != "" {
            Button(action: {
              do {
                let doc = try node.docCreate()
                setDoc(doc)
              } catch (let failure) {
                print("couldn't create doc \(failure.localizedDescription)")
              }
            }, label: {
              VStack{
                Text("New Anchor Doc")
                Text("ask \(sessionInfo.anchorName).iroh.network to create a new document & share write access with this device")
              }
            })
          }
        }
      }
    }
}
