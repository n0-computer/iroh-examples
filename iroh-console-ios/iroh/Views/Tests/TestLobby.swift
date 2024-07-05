//
//  TestLobby.swift
//  iroh
//
//  Created by Brendan O'Brien on 7/26/23.
//

import SwiftUI

struct TestLobby: View {
    @State private var peers: [String] = []
    @State private var currentIndex: Int = 0
    @State private var timer: Timer? = nil
    
    private let mockPeers = [
        "dig",
        "ramfox",
        "arqu",
        "rklaehn",
        "flub",
        "divma",
        "frando"
    ]
                          
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            VStack {
                Text("One")
                    .font(Font.custom("Space Mono", size: 32))
                    .lineSpacing(48)
                    .foregroundColor(.primary)
                    .frame(maxWidth: .infinity, alignment: .leading)
                Text("doc sync test")
                    .font(Font.custom("Space Mono", size: 16))
                    .lineSpacing(23)
                    .foregroundColor(.secondary)
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
            .padding(EdgeInsets(top: 20, leading: 20, bottom: 0, trailing: 20))
            
            VStack {
                ShareLink("Share Test Invite", item: URL(string: "https://iroh.network")!)
                    .font(Font.custom("Space Mono", size: 20).weight(.bold))
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
            .padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 20))
            
            List {
                Section("Participants") {
                    ForEach(peers, id: \.self) { peer in
                        Text(peer)
                    }
                }
            }
            Spacer()
            
            VStack {
                NavigationLink(destination: DocSyncTest(), label: {
                    Text("START TEST")
                        .font(Font.custom("Space Mono", size: 20))
                        .lineSpacing(48)
                        .foregroundColor(.white)
                        .padding(EdgeInsets(top: 6, leading: 10, bottom: 6, trailing: 10))
                        .frame(width: 350, height: 60)
                        .background(Color(red: 0.42, green: 0.42, blue: 0.85))
                        .cornerRadius(2);
                })
            }
            .padding(EdgeInsets(top: 0, leading: 30, bottom: 0, trailing: 30))
        }
        .padding(EdgeInsets(top: 0, leading: 5, bottom: 20, trailing: 5))
        .onAppear {
            DispatchQueue.main.asyncAfter(deadline: .now() + 5) {
                startTimer()
            }
        }
        .onDisappear {
            stopTimer()
        }
    }
    
    private func startTimer() {
        timer = Timer.scheduledTimer(withTimeInterval: randomInterval(), repeats: true) { _ in
            if currentIndex < mockPeers.count {
                let event = mockPeers[currentIndex]
                peers.append(event)
                currentIndex += 1
            } else {
                stopTimer()
            }
        }
    }

    private func stopTimer() {
        timer?.invalidate()
        timer = nil
    }

    private func randomInterval() -> TimeInterval {
        let randomSeconds = Double.random(in: 0.2...0.75)
        return randomSeconds
    }
}

struct TestLobby_Previews: PreviewProvider {
    static var previews: some View {
        TestLobby()
    }
}
