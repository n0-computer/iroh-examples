//
//  SessionInfo.swift
//  IrohApp
//
//  Created by Brendan O'Brien on 9/12/23.
//

import Foundation


class UserSession: ObservableObject {
  @Published var sessionToken: String = ""
  @Published var anchorName: String = ""

  @Published var user: IrohAnchorAPI.Types.Response.User? = nil
  @Published var anchorDialingInfo: IrohAnchorAPI.Types.Response.AnchorDialingInfo? = nil
  @Published var projects: [IrohAnchorAPI.Types.Response.Project]? = nil
  @Published var documents: [IrohAnchorAPI.Types.Response.DocumentInfo]? = nil
  
  init() {
    if let session = self.readSessionFromDisk() {
      if session.token != "" && session.anchorName != "" {
        print("loaded session from disk")
        self.sessionToken = session.token
        self.anchorName = session.anchorName
        self.fetchAll(sessionToken: self.sessionToken)
      }
    }
  }
  
  private func session() -> SessionCodable {
    return SessionCodable(
      token: self.sessionToken,
      anchorName: self.anchorName)
  }
  
  private func sessionTokenPath() -> URL {
    let sessionTokenFilename = "user_session.json"
    let paths = FileManager.default.urls(for: .libraryDirectory, in: .userDomainMask)
    return paths[0].appendingPathComponent(sessionTokenFilename)
  }
  
  private func writeSessionToDisk() {
    do {
      let data = try JSONEncoder().encode(self.session())
      try data.write(to: self.sessionTokenPath())
      print("wrote session to disk")
    } catch {
      print("error writing token to file")
    }
  }
  
  private func readSessionFromDisk() -> SessionCodable? {
    do {
      if let jsonData = try String(contentsOf: self.sessionTokenPath(), encoding: String.Encoding.utf8).data(using: .utf8) {
        let contents = try JSONDecoder().decode(SessionCodable.self, from: jsonData)
        return contents
      }
    } catch  (let failure) {
      print("error reading session from disk: \(failure)")
    }
    return nil
  }
  
  func login(username: String, password: String) {
    // Send credentials
    IrohAnchorAPI.Client.shared.login(username, password) { result in
      switch result {
      case .success(let success):
        DispatchQueue.main.async {
          self.sessionToken = success.token
          self.writeSessionToDisk()
        }
        self.fetchAll(sessionToken: success.token)
      case .failure(let failure):
        print("problem logging in: \(failure.localizedDescription)")
      }
    }
  }
  
  func logout() {
    DispatchQueue.main.async {
      self.sessionToken = ""
      self.anchorName = ""
      self.user = nil
      self.anchorDialingInfo = nil
      self.projects = nil
      self.documents = nil
    }

    writeSessionToDisk()
  }
  
  func fetchAll(sessionToken: String) {
    IrohAnchorAPI.Client.shared.me(sessionToken) { result in
      switch result {
      case .success(let me):
        DispatchQueue.main.async {
          self.user = me
        }
      case .failure(let failure):
        switch failure {
        case .generic:
          print("problem getting my profile: \(failure.localizedDescription)")
        case .unauthorized:
          self.logout()
        case .internal:
          print("problem getting my profile: \(failure.localizedDescription)")
        }
      }
    }
    
//    IrohAnchorAPI.Client.shared.anchorDetails(anchor, sessionToken) { result in
//      switch result {
//      case .success(let dialingInfo):
//        DispatchQueue.main.async {
//          self.anchorDialingInfo = dialingInfo
//        }
//      case .failure(let failure):
//        print("problem fetching anchor details: \(failure.localizedDescription)")
//      }
//    }
//    
//    IrohAnchorAPI.Client.shared.anchorEgress(anchor, sessionToken) { result in
//      switch result {
//      case .success(let egress):
//        DispatchQueue.main.async {
//          self.anchorEgress = egress
//        }
//      case .failure(let failure):
//        print("problem fetching anchor egress: \(failure.localizedDescription)")
//      }
//    }
//    
//    IrohAnchorAPI.Client.shared.myProjects(anchor, sessionToken) { result in
//      switch result {
//      case .success(let anchors):
//        DispatchQueue.main.async {
//          self.anchors = anchors
//        }
//      case .failure(let failure):
//        print("problem fetching anchors: \(failure.localizedDescription)")
//      }
//    }
//    
//    IrohAnchorAPI.Client.shared.docs(anchor, sessionToken) { result in
//      switch result {
//      case .success(let docs):
//        DispatchQueue.main.async {
//          self.documents = docs
//        }
//      case .failure(let failure):
//        print("problem fetching docs: \(failure.localizedDescription)")
//      }
//    }
  }
}

private struct SessionCodable: Codable {
  var token: String
  var anchorName: String
}
