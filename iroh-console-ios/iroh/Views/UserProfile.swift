//
//  UserProfile.swift
//  IrohConsole
//
//  Created by Brendan O'Brien on 9/19/23.
//

import SwiftUI

struct UserProfile: View {
  var user: IrohAnchorAPI.Types.Response.User
  
  var body: some View {
    VStack(alignment: .leading, spacing: 5) {
      Text("USERNAME")
        .font(Font.caption)
        .foregroundColor(.secondary)
      Text(user.name)
      
      Text("USER_PUBLIC_KEY")
        .font(Font.caption)
        .foregroundColor(.secondary)
      Text(user.pub_key)
    }
  }
}
