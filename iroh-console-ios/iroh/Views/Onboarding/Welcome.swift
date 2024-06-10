//
//  Welcome.swift
//  iroh
//
//  Created by Brendan O'Brien on 8/4/23.
//

import SwiftUI

struct Welcome: View {
    var body: some View {
        VStack(spacing: 0) {
          VStack(alignment: .leading, spacing: 40) {
            Spacer()

            VStack(alignment: .leading, spacing: 10) {
              Text("Welcome")
                .font(Font.custom("Space Mono", size: 32))
                .lineSpacing(48)
                .foregroundColor(.white)
              Text("You’ll need an invite to iroh.network to use this app. If you don’t have one, feel free to join the waitlist.")
                .font(Font.custom("Space Mono", size: 16))
                .lineSpacing(23)
                .foregroundColor(.white)
            }
            .frame(maxWidth: .infinity, minHeight: 150, maxHeight: 150)
              
            VStack(alignment: .leading, spacing: 10) {
              HStack(spacing: 0) {
                Text("SIGNUP")
                  .font(Font.custom("Space Mono", size: 20))
                  .lineSpacing(48)
                  .foregroundColor(.white)
              }
              .padding(EdgeInsets(top: 6, leading: 10, bottom: 6, trailing: 10))
              .frame(maxWidth: .infinity)
              .background(Color(red: 0.42, green: 0.42, blue: 0.85))
              .cornerRadius(2)
              HStack(spacing: 0) {
                Text("LOGIN")
                  .font(Font.custom("Space Mono", size: 20))
                  .lineSpacing(48)
                  .foregroundColor(.white)
              }
              .padding(EdgeInsets(top: 6, leading: 10, bottom: 6, trailing: 10))
              .frame(maxWidth: .infinity)
              .background(Color(red: 0.42, green: 0.42, blue: 0.85))
              .cornerRadius(2)
              HStack(spacing: 0) {
                Text("JOIN THE WAITLIST")
                  .font(Font.custom("Space Mono", size: 20))
                  .lineSpacing(48)
                  .foregroundColor(.white)
              }
              .padding(EdgeInsets(top: 6, leading: 10, bottom: 6, trailing: 10))
              .frame(maxWidth: .infinity)
              .background(Color(red: 0.42, green: 0.42, blue: 0.85))
              .cornerRadius(2)
            }
            .frame(maxWidth: .infinity, minHeight: 200, maxHeight: 200)
          }
          .padding(20)
          .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .frame(width: 390, height: 844)
        .background(Color(red: 0.13, green: 0.15, blue: 0.20))
    }
}

struct Welcome_Previews: PreviewProvider {
    static var previews: some View {
        Welcome()
    }
}
