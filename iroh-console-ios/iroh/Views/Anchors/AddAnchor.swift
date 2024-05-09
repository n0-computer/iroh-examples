//
//  AddNetwork.swift
//  iroh
//
//  Created by Brendan O'Brien on 7/11/23.
//

import SwiftUI

struct AddAnchor: View {
    @State private var creating = false

    var body: some View {
        VStack {
            VStack {
                Group {
                    if creating {
                        CreatingAnchor()
                    } else {
                        VStack() {
                          Text("New Anchor")
                            .font(Font.custom("Space Mono", size: 32).weight(.bold))
                            .lineSpacing(48)
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity, alignment: .leading)
                          Text("Choose a name for your anchor. You can change this later.")
                            .font(Font.custom("Space Mono", size: 14))
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .fixedSize(horizontal: false, vertical: true)
                        }

                        VStack(alignment: .leading, spacing: 0) {
                          Text("ANCHOR PRETTY NAME")
                            .font(Font.custom("Space Mono", size: 14))
                            .lineSpacing(20)
                            .foregroundColor(Color(red: 0.40, green: 0.46, blue: 0.63))
                          Text("Example")
                            .font(Font.custom("Space Mono", size: 28))
                            .lineSpacing(36)
                            .foregroundColor(.white)
                            .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
                        }
                        .padding(6)
                        .cornerRadius(2)
                        .overlay(
                              RoundedRectangle(cornerRadius: 2)
                                .inset(by: 0.50)
                                .stroke(Color(red: 0.21, green: 0.24, blue: 0.33), lineWidth: 1)
                            );
                        
                        VStack(alignment: .leading, spacing: 2) {
                          Text("ANCHOR URL")
                            .font(Font.custom("Space Mono", size: 14))
                            .foregroundColor(Color(red: 0.40, green: 0.46, blue: 0.63))
                            HStack(spacing: 0) {
                                Text("example")
                                  .font(Font.custom("Space Mono", size: 20))
                                  .foregroundColor(.white)
                                  .frame(alignment: .leading)
                                  .padding(0)
                                Text(".iroh.network")
                                    .font(Font.custom("Space Mono", size: 20))
                                    .foregroundColor(Color(red: 0.40, green: 0.46, blue: 0.63))
                                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
                                
                            }
                        }
                        .padding(6)
                        .cornerRadius(2)
                        .overlay(
                              RoundedRectangle(cornerRadius: 2)
                                .inset(by: 0.50)
                                .stroke(Color(red: 0.21, green: 0.24, blue: 0.33), lineWidth: 1)
                            );
                        
                        Spacer()
                        Button(action: {
                            creating = true
                        }, label: {
                            Text("CREATE ANCHOR")
                                .font(Font.custom("Space Mono", size: 20))
                                .foregroundColor(.white)
                                .padding(EdgeInsets(top: 10, leading: 10, bottom: 10, trailing: 10))
                                .frame(minWidth: 0, maxWidth: .infinity)
                                .background(Color(red: 0.42, green: 0.42, blue: 0.85))
                                .cornerRadius(2);
                        })
                    }
                }
            }
            .padding(20)
            .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        }.background(Color(red: 0.13, green: 0.15, blue: 0.20))
            
    }
}

struct CreatingAnchor: View {
    @EnvironmentObject var anchor: NetworkModelController
    @State private var progress: CGFloat = 0.0
    @State private var isCompleted = false
    @Environment(\.dismiss) private var dismiss
    
    var body: some View {
        VStack {
            ProgressView("Creating Anchor:", value: progress, total: 1)
                .padding()
                .font(Font.custom("Space Mono", size: 20))
                .lineSpacing(48)
                .foregroundColor(.white)
        }
        .onAppear {
            startTimer()
        }
    }
    
    private func startTimer() {
        Timer.scheduledTimer(withTimeInterval: 2, repeats: false) { _ in
            withAnimation {
                progress = 1.0
                isCompleted = true
                dismiss()
                let newAnchor = Network(network_id: "new netork", created_by: "b5", created_at: "now", updated_at: "now", name: "Example", anchor_url: "example.iroh.network")
                networks.append(newAnchor)
                anchor.anchor = newAnchor

            }
        }
    }
}

struct AddAnchor_Previews: PreviewProvider {
    static var previews: some View {
        AddAnchor()
    }
}
