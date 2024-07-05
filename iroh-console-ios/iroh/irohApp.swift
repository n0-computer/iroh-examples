//
//  irohApp.swift
//  iroh
//
//  Created by Brendan O'Brien on 5/22/23.
//

import SwiftUI

@main
struct irohApp: App {
    @StateObject private var irohNodeManager = IrohNodeManager.shared
    
    var body: some Scene {
        WindowGroup {
            ContentView()
              .environmentObject(irohNodeManager)
              .onAppear() {
                irohNodeManager.start()
              }
        }
    }
}
