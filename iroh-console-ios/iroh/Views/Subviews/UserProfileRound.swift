//
//  UserProfileRound.swift
//  IrohApp
//
//  Created by Brendan O'Brien on 9/13/23.
//

import SwiftUI

struct UserProfileRound: View {
  @EnvironmentObject var session: UserSession
  @State var showingActionSheet: Bool = false
  
  var body: some View {
    Group {
      if let user = session.user {
        Button(action: { showingActionSheet = true }, label: {
          ZStack() {
            Ellipse()
              .foregroundColor(.clear)
              .frame(width: 32, height: 32)
              .background(Color(red: 0.42, green: 0.42, blue: 0.85))
              .offset(x: 0, y: 0)
              .cornerRadius(32)
            Text(user.name.trunc(length: 1, trailing: ""))
              .font(Font.custom("Space Mono", size: 16))
              .lineSpacing(23)
              .foregroundColor(.white)
              .offset(x: 0, y: -0.50)
          }
          .frame(width: 32, height: 32)
        })
        .popover(isPresented: $showingActionSheet, content: {
          VStack(alignment: .leading, spacing: 10) {
            UserProfile(user: user)

            Button("logout") {
              showingActionSheet = false
              session.logout()
            }
          }.padding(20)
        })
      }
    }
  }
}

struct UserProfileRound_Previews: PreviewProvider {
    static var previews: some View {
        UserProfileRound()
          .environmentObject(UserSession())
    }
}
