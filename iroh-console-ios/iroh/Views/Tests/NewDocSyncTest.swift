//
//  NewDocSyncTest.swift
//  iroh
//
//  Created by Brendan O'Brien on 7/26/23.
//

import SwiftUI

struct NewDocSyncTest: View {
    
    var body: some View {
            VStack(alignment: .leading, spacing: 10) {
                Text("NEW NETWORK DOC SYNC TEST")
                    .font(Font.custom("Space Mono", size: 16).weight(.bold))
                    .foregroundColor(.secondary)
                    
                VStack(alignment: .leading, spacing: 0) {
                    Text("TEST NAME")
                        .font(Font.custom("Space Mono", size: 14))
                        .lineSpacing(20)
                        .foregroundColor(Color(red: 0.21, green: 0.24, blue: 0.33))
                        .frame(maxWidth: .infinity, alignment: .leading)
                    Text("Test One")
                        .font(Font.custom("Space Mono", size: 28).weight(.bold))
                        .lineSpacing(36)
                        .foregroundColor(Color(red: 0.36, green: 0.42, blue: 0.58))
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
                .padding(EdgeInsets(top: 4, leading: 6, bottom: 4, trailing: 6))
                .frame(width: 350, height: 64)
                .cornerRadius(2)
                .overlay(
                    RoundedRectangle(cornerRadius: 2)
                        .inset(by: 0.50)
                        .stroke(Color(red: 0.21, green: 0.24, blue: 0.33), lineWidth: 0.50)
                )
                Spacer()
                NavigationLink(destination: TestLobby(), label: {
                    Text("CREATE TEST")
                        .font(Font.custom("Space Mono", size: 20))
                        .foregroundColor(.white)
                        .padding(EdgeInsets(top: 6, leading: 10, bottom: 6, trailing: 10))
                        .frame(width: 350, height: 60)
                        .background(Color(red: 0.42, green: 0.42, blue: 0.85))
                        .cornerRadius(3);
                })
            }.padding(20)
    }
}

struct NewDocSyncTest_Previews: PreviewProvider {
    static var previews: some View {
        NewDocSyncTest()
    }
}
