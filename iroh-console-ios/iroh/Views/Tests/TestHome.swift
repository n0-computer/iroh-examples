//
//  TestHome.swift
//  iroh
//
//  Created by Brendan O'Brien on 7/26/23.
//

import SwiftUI

struct TestHome: View {
  @EnvironmentObject var irohNodeManager: IrohNodeManager
  @State private var path = NavigationPath()
  @State private var showingTest = false

  var body: some View {
      NavigationStack(path: $path) {
          VStack(alignment: .leading, spacing: 10) {
              Topbar()
              VStack(alignment: .leading, spacing: 0) {
                  Text("Tests")
                      .font(Font.custom("Space Mono", size: 32))
                      .lineSpacing(48)
                      .foregroundColor(.primary)
                      .frame(maxWidth: .infinity, alignment: .leading)
                  Text("default.iroh.network")
                      .font(Font.custom("Space Mono", size: 16))
                      .lineSpacing(23)
                      .foregroundColor(.secondary)
                      .frame(maxWidth: .infinity, alignment: .leading)
              }
              .padding(EdgeInsets(top: 20, leading: 0, bottom: 0, trailing: 0))
              .frame(maxWidth: .infinity, minHeight: 91, maxHeight: 91)
              
              List {
                  Section("Documents") {
                      Button(action: {
                          showingTest = true
                      }, label: {
                          Text("New Doc Sync Test")
                              .font(Font.custom("Space Grotesk", size: 20).weight(.light))
                              .foregroundColor(Color(red: 0.13, green: 0.15, blue: 0.20))
                      }).popover(isPresented: $showingTest, content: {
                          NavigationView {
                              NewDocSyncTest()
                          }
                      })
                      NavigationLink(destination: JoinDocSyncTest(), label: {
                          Text("Join Doc Sync Test")
                              .font(Font.custom("Space Grotesk", size: 20).weight(.light))
                              .foregroundColor(Color(red: 0.13, green: 0.15, blue: 0.20))
                      })
                  }
              }
              Spacer()
          }
          .padding(20)
      }
  }
}

struct TestHome_Previews: PreviewProvider {
  static var previews: some View {
      let inm = IrohNodeManager.shared
      TestHome()
          .environmentObject(inm)
          .onAppear() {
              inm.start()
          }
  }
}
