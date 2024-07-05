//
//  Topbar.swift
//  iroh
//
//  Created by Brendan O'Brien on 7/27/23.
//

import SwiftUI

struct Topbar: View {
    @State private var showingPopover = false

    var body: some View {
            HStack(alignment: .bottom, spacing: 0) {
              HStack(spacing: 0) {
                  Button(action: {
                      showingPopover = true
                  }) {
                      Image("IrohLogoPurple")
                          .resizable()
                          .frame(width: 90, height: 30)
                  }
                  .popover(isPresented: $showingPopover) {
                      AnchorsList()
                  }
              }
              .frame(width: 75, height: 25)
              Rectangle()
                .foregroundColor(.clear)
                .frame(maxWidth: .infinity, minHeight: 15, maxHeight: 15)
              UserProfileRound()
            }
            .padding(EdgeInsets(top: 0, leading: 0, bottom: 10, trailing: 0))
    }
}

struct Topbar_Previews: PreviewProvider {
    static var previews: some View {
        Topbar()
          .environmentObject(UserSession())
    }
}
