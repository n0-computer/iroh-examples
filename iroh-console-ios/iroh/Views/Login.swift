//
//  Login.swift
//  iroh
//
//  Created by Brendan O'Brien on 8/4/23.
//

import SwiftUI

struct Login: View {
  @EnvironmentObject var sessionInfo: UserSession

//  @State private var anchor: String = ""
  @State private var username: String = ""
  @State private var password: String = ""
  @State private var failure: String = ""

  var body: some View {
    VStack(alignment: .leading){
//      Text("ANCHOR")
//        .font(Font.caption)
//        .foregroundColor(.secondary)
//      HStack {
//        TextField("anchor-name", text: $anchor)
//          .autocapitalization(.none)
//          .fixedSize(horizontal: true, vertical: false)
//          .multilineTextAlignment(.center)
//        Text(".iroh.network")
//          .foregroundColor(.secondary)
//        Spacer()
//      }
      
      Text("USERNAME")
        .font(Font.caption)
        .foregroundColor(.secondary)
      TextField("username", text: $username)
        .autocapitalization(.none)
      
      Text("PASSWORD")
        .font(Font.caption)
        .foregroundColor(.secondary)
      SecureField("password", text: $password)
        .autocapitalization(.none)

      Button("Login") {
        sessionInfo.login(username: username, password: password)
      }
    }
    .padding(20)
  }
  
}

struct Login_Previews: PreviewProvider {
    static var previews: some View {
        Login()
        .environmentObject(UserSession())
    }
}
