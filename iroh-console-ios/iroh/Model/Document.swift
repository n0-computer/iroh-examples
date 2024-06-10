//
//  Document.swift
//  iroh
//
//  Created by Brendan O'Brien on 7/26/23.
//

import Foundation


struct Document: Hashable, Codable {
    var name : String
    var created_by : String
    var created_at : String
    var updated_at : String
    var public_key : String
    var anchor_url : String
}

enum DocEventType: String, Codable {
    case DocumentCreated = "Document Created"
    case YouSetKey = "Wrote Key"
    case YouDeletedKey = "Key Deleted"
    case PeerSetKey = "Key Set by a Peer"
    case PeerDeletedKey = "Key Deleted by a Peer"
    case PeerJoined = "Peer Joined"
    case PeerLeft = "Peer Left"
    case Error = "Error"
}

struct DocEvent: Hashable, Codable {
    var tipe         : DocEventType
    var ts           : Date
    var author_id    : String
    var author_name  : String
    var key          : String
    var value        : String
    var message      : String
}
