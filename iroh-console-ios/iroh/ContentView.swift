//
//  ContentView.swift
//  iroh
//
//  Created by Brendan O'Brien on 5/22/23.
//

import SwiftUI
import IrohLib

struct ContentView: View {
    @StateObject private var sessionInfo = UserSession()
    @ObservedObject var anchor: NetworkModelController = NetworkModelController(anchor: networks[0])
    
    var body: some View {
      TabView {
        NodeHome()
          .tabItem {
            Label("Node", systemImage: "macpro.gen2.fill")
          }
        Console()
          .tabItem {
            Label("Console", systemImage: "terminal")
            }
//        AnchorHome()
//          .tabItem {
//            Label("Anchor", systemImage: "scalemass.fill")
//          }
      }.environmentObject(sessionInfo)
    }
}

extension UIApplication {
    func handleKeyboard() {
        guard let window = windows.first else { return }
        let tapRecognizer = UITapGestureRecognizer(target: window, action: #selector(UIView.endEditing))
        tapRecognizer.cancelsTouchesInView = false
        tapRecognizer.delegate = self
        window.addGestureRecognizer(tapRecognizer)
    }
 }

extension UIApplication: UIGestureRecognizerDelegate {
    public func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer) -> Bool {
        return false
    }
}


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
          .environmentObject(IrohNodeManager.shared)
          .onAppear() {
            IrohNodeManager.shared.start()
          }
    }
}
