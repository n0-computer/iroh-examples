//
//  ConfigPicker.swift
//  iroh
//
//  Created by Brendan O'Brien on 7/4/23.
//

import SwiftUI

struct AnchorsList: View {
    @EnvironmentObject var anchor: NetworkModelController
    @Environment(\.dismiss) private var dismiss
    
    var body: some View {
        NavigationView {
            VStack {
                List(networks, id: \.network_id) {
                    network in
                    Button(network.name) {
                        anchor.anchor = network
                        dismiss()
                    }
                }
                NavigationLink("Add", destination: AddAnchor())
                Spacer()
            }
        }
    }
}

struct AnchorItem: View {
    @EnvironmentObject var anchor: NetworkModelController
    var network: Network
    var body: some View {
        NavigationLink(network.name) {
            AnchorHome()
        }
    }
}

struct NetworksList_Previews: PreviewProvider {
    static var previews: some View {
        AnchorsList()
    }
}

