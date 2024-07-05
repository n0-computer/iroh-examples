//
//  EditConfig.swift
//  iroh
//
//  Created by Brendan O'Brien on 7/26/23.
//

import SwiftUI

struct EditConfig: View {
    var network: Network

    var body: some View {
        VStack{
            Topbar()
            VStack(alignment: .leading, spacing: 0) {
                Text("Anchor Config")
                .font(Font.custom("Space Mono", size: 32))
                .foregroundColor(.primary)
                .frame(maxWidth: .infinity, alignment: .leading)
              Text("default.iroh.network")
                .font(Font.custom("Space Mono", size: 16))
                .lineSpacing(23)
                .foregroundColor(.secondary)
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 20))
            .frame(maxWidth: .infinity)
            Form{
                Section(header: Text("anchor configuration")) {
                    TextConfigItem(title: "Network Pretty Name", description: "The name displayed to users when they are asked to select a network.", key: "pretty_name", value: "My Network")
                    TextConfigItem(title: "Network Machine Name", description: "The name displayed to users when they are asked to select a network.", key: "pretty_name", value: "my-network")
                    BoolConfigItem(title: "Kubo Replication", description: "Publish all content to the kubo IPFS network", key: "kuboReplication")
                    PickerConfigItem(title: "Access", description: "How do you want to govern connections to your anchor?", key: "access", options: ["public", "private"])
                    PickerConfigItem(title: "Data Availability", description: "What should happen when no online peers have content someone asks for?", key: "reproviding", options: ["full", "require token", "none"])
                }
            }
        }
    }
}

struct BoolConfigItem: View {
    var title: String
    var description: String
    var key: String
    @State private var active = false

    var body: some View {
        VStack(alignment: .leading) {
            Toggle(title, isOn: $active)
                .font(Font.custom("Space Grotesk", size: 18).weight(.bold))
                .foregroundColor(.primary)
                .frame(maxWidth: .infinity, alignment: .leading)
                .toggleStyle(SwitchToggleStyle(tint: Color(red: 0.42, green: 0.42, blue: 0.85)))
            Text(description)
                .font(.subheadline)
                .foregroundColor(.secondary)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
    }
}

struct TextConfigItem: View {
    var title: String
    var description: String
    var key: String
    @State var value: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(title)
                .font(Font.custom("Space Grotesk", size: 18).weight(.bold))
                .foregroundColor(.primary)
                .frame(maxWidth: .infinity, alignment: .leading)
            Text(description)
                .font(.subheadline)
                .foregroundColor(.secondary)
                .frame(maxWidth: .infinity, alignment: .leading)
            TextField("Network Pretty Name", text: $value)
        }
    }
}

struct PickerConfigItem: View {
    var title: String
    var description: String
    var key: String
    var options: [String] = []
    @State private var index = 0
    
    var body: some View {
        VStack{
            Picker(selection: $index, label: Text(title)) {
                ForEach(options, id: \.self) { option in
                    Text(option)
                }
            }
                .font(Font.custom("Space Grotesk", size: 18).weight(.bold))
                .foregroundColor(.primary)
                .frame(maxWidth: .infinity, alignment: .leading)
            Text(description)
                .font(.subheadline)
                .foregroundColor(.secondary)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
    }
    
}

struct EditConfig_Previews: PreviewProvider {
    static var previews: some View {
        EditConfig(network: networks[0])
    }
}
