//
//  IrohNetworkAPITypes.swift
//  IrohApp
//
//  Created by Brendan O'Brien on 8/9/23.
//

import Foundation

extension IrohAnchorAPI {
  enum Types {
    enum Request {
      struct Empty: Encodable {}
      
      struct Login: Encodable {
        var name_or_email: String
        var password: String
      }
      
      struct DocJoin: Encodable {
        var name: String
        var ticket: String
      }
    
    }
    
    enum Response {
      struct User: Decodable {
        var user_id: String
        var name: String
        var user_role: String
        var pub_key: String
      }

      struct Session: Decodable {
        var status: String
        var token: String
      }
      
      struct AnchorDialingInfo: Decodable {
        var peer_id: String
        var addr: String
        var auth_token: String
      }
      
      struct Project: Decodable, Hashable {
        var project_id: String
        var name: String
        var owner_id: String
      }
      
      struct UserProjects: Decodable {
        static func == (lhs: IrohAnchorAPI.Types.Response.UserProjects, rhs: IrohAnchorAPI.Types.Response.UserProjects) -> Bool {
          return lhs.user.user_id == rhs.user.user_id
        }
        
        var user: IrohAnchorAPI.Types.Response.User
        var projects: [IrohAnchorAPI.Types.Response.Project]
      }
      
      struct DocumentInfo: Decodable, Hashable {
        var doc_id: String
        var name: String
      }
      
      struct Egress: Decodable {
        var summary: EgressSummary
        var daily: [EgressDaily]
      }
      
      struct EgressSummary: Decodable {
        var egress_bytes: Int
        var egress_blobs: Int
        var requests: Int
      }
      
      struct EgressDaily: Codable, Equatable {
        var date: Date
        var egress_bytes: Int
        var egress_blobs: Int
        var requests: Int
        var nodeId: String? // TODO - this missing from iroh.network API, but used locally
        
        static func == (lhs: Self, rhs: Self) -> Bool {
          return lhs.date == rhs.date &&
            lhs.egress_bytes == rhs.egress_bytes &&
            lhs.egress_blobs == rhs.egress_blobs &&
            lhs.requests == rhs.requests &&
            lhs.nodeId == rhs.nodeId
        }
      }
    }
    
    enum Error: LocalizedError {
        case generic(reason: String)
        case unauthorized
        case `internal`(reason: String)
        
        var errorDescription: String? {
            switch self {
            case .generic(let reason):
                return reason
            case .unauthorized:
                return "unauthorized"
            case .internal(let reason):
                return "Internal Error: \(reason)"
            }
        }
    }
    
    enum Endpoint {
      case health
      case nodeStatus
      case login
      case me
      case myProjects
//      case teams(username: String)
      case docs(username: String, project: String, limit: Int, offset: Int)
      case doc(username: String, project: String, docId: String)
      case docJoin(username: String, project: String)
      case blobs(username: String, project: String)
      case egress(username: String, project: String)
      
      func url() -> URL {
        var components = URLComponents()
        components.host = "api.iroh.network"
        components.scheme = "https"
        
        switch self {
        case .health:
          components.path = "/health"
        case .nodeStatus:
          components.path = "/node/status"

        case .login:
          components.path = "/user/login"
        case .me:
          components.path = "/user/me"
        case .myProjects:
          components.path = "/user/me/projects"
//        case .teams(let username):
//          components.path = "/teams/\(username)"
        case .docs(let username, let project, _, _):
          components.path = "/docs/\(username)/\(project)"
        case .doc(let username, let project, let docId):
          components.path = "/docs/\(username)/\(project)/\(docId)"
        case .docJoin(let username, let project):
          components.path = "/docs/\(username)/\(project)/join"

        case .blobs(let username, let project):
          components.path = "/blobs/\(username)/\(project)"
        case .egress(let username, let project):
          components.path = "/egress/\(username)/\(project)"
        }
        
        return components.url!
      }
    }
    
    enum Method: String {
        case get
        case post
    }
  }
}
