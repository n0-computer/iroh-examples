//
//  Configuration.swift
//  iroh
//
//  Created by Brendan O'Brien on 7/4/23.
//

import Foundation

struct Network: Hashable, Codable {
    var network_id : String
    var created_by : String
    var created_at : String
    var updated_at : String
    var name       : String
    var anchor_url : String
}

class NetworkModelController: ObservableObject {
    @Published var anchor: Network

    init(anchor: Network) {
        self.anchor = anchor
    }
}
