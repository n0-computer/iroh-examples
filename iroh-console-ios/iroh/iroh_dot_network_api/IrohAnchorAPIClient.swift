//
//  IrohNetworkAPIClient.swift
//  IrohApp
//
//  Created by Brendan O'Brien on 8/9/23.
//

import Foundation

extension IrohAnchorAPI {
  
    class Client {
        static let shared = Client()
        private let encoder = JSONEncoder()
        private let decoder = JSONDecoder()
        
      func fetch<Request, Response>(_ endpoint: Types.Endpoint,
                                    bearerToken: String = "",
                                    method: Types.Method = .get,
                                    body: Request? = nil,
                                    then callback: ((Result<Response, Types.Error>) -> Void)? = nil
        ) where Request: Encodable, Response: Decodable {
          let url = endpoint.url()
          print("\(method.rawValue): \(url)")
          var urlRequest = URLRequest(url: url)
          urlRequest.httpMethod = method.rawValue
          urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")
          if bearerToken != "" {
            urlRequest.setValue("Bearer: \(bearerToken)", forHTTPHeaderField: "Authorization")
          }
          if let body = body {
            do {
              urlRequest.httpBody = try self.encoder.encode(body)
            } catch {
              callback?(.failure(.internal(reason: "Could not encode body to JSON")))
              return
            }
          }
              
          // TODO(b5): return the dataTask so it can be cancelled
          let dataTask = URLSession.shared
            .dataTask(with: urlRequest) { data, response, error in
                if let httpResponse = response as? HTTPURLResponse {
                  // Check if the request was successful (status code 200)
                  print("\(method.rawValue) \(url): \(httpResponse.statusCode)")
                  if httpResponse.statusCode == 401 {
                    callback?(.failure(.unauthorized))
                  }
                }
                if let error = error {
                    print("fetch error: \(error)")
                    callback?(.failure(.generic(reason: "Could not fetch data from iroh.network API: \(error.localizedDescription)")))
                    return
                } else {
                    if let data = data {
                        do {
//                          let body = String(decoding: data, as: UTF8.self)
//                            print("BODY: \(body)")
                            let result = try self.decoder.decode(Response.self, from: data)
                            callback?(.success(result))
                        } catch {
                            print("Decode error \(error) response body:")
                            print(String(decoding: data, as: UTF8.self))
                            callback?(.failure(.generic(reason: "could not decode data: \(error.localizedDescription)")))
                        }
                    }
                }
            }
          dataTask.resume()
        }
        
      func get<Response>(_ endpoint: Types.Endpoint,
                         then callback: ((Result<Response, Types.Error>) -> Void)? = nil
        
        ) where Response: Decodable {
          let body: Types.Request.Empty? = nil
          fetch(endpoint, body: body) { result in
                callback?(result)
            }
        }
      
      func health(
        then callback: ((Result<IrohAnchorAPI.Types.Response.Session, IrohAnchorAPI.Types.Error>) -> Void)? = nil
      ) {
        let body: Types.Request.Empty? = nil
        fetch(.health, method: .get, body: body) { (result: Result<IrohAnchorAPI.Types.Response.Session, IrohAnchorAPI.Types.Error>) in
          callback?(result)
        }
      }
      func login(
        _ username_or_email: String,
        _ password: String,
        then callback: ((Result<IrohAnchorAPI.Types.Response.Session, IrohAnchorAPI.Types.Error>) -> Void)? = nil) {
          let body = IrohAnchorAPI.Types.Request.Login(name_or_email: username_or_email, password: password)
          fetch(.login, method: .post, body: body) { (result: Result<IrohAnchorAPI.Types.Response.Session, IrohAnchorAPI.Types.Error>) in
            callback?(result)
          }
      }
      
      func me(
        _ sessionToken: String,
        then callback: ((Result<IrohAnchorAPI.Types.Response.User, IrohAnchorAPI.Types.Error>) -> Void)? = nil) {
          let body: Types.Request.Empty? = nil
          fetch(.me, bearerToken: sessionToken, body: body) { (result: Result<IrohAnchorAPI.Types.Response.User, IrohAnchorAPI.Types.Error>) in
            callback?(result)
          }
      }
      
      func myProjects(
        _ sessionToken: String,
        then callback: ((Result<IrohAnchorAPI.Types.Response.UserProjects, IrohAnchorAPI.Types.Error>) -> Void)? = nil) {
          let body: Types.Request.Empty? = nil
          fetch(.myProjects, bearerToken: sessionToken, body: body) { (result: Result<IrohAnchorAPI.Types.Response.UserProjects, IrohAnchorAPI.Types.Error>) in
            callback?(result)
          }
      }
      
      func nodeStatus(
        _ sessionToken: String,
        then callback: ((Result<IrohAnchorAPI.Types.Response.AnchorDialingInfo, IrohAnchorAPI.Types.Error>) -> Void)? = nil) {
          let body: Types.Request.Empty? = nil
          fetch(.nodeStatus, bearerToken: sessionToken, body: body) { (result: Result<IrohAnchorAPI.Types.Response.AnchorDialingInfo, IrohAnchorAPI.Types.Error>) in
            callback?(result)
          }
      }
      
      func egress(
        _ username: String,
        _ project: String,
        _ sessionToken: String,
        then callback: ((Result<IrohAnchorAPI.Types.Response.Egress, IrohAnchorAPI.Types.Error>) -> Void)? = nil) {
          let body: Types.Request.Empty? = nil
          fetch(.egress(username: username, project: project), bearerToken: sessionToken, body: body) { (result: Result<IrohAnchorAPI.Types.Response.Egress, IrohAnchorAPI.Types.Error>) in
            callback?(result)
          }
      }
      
//      func teams(
//        _ username: String,
//        _ sessionToken: String,
//        then callback: ((Result<[IrohAnchorAPI.Types.Response.AnchorInfo], IrohAnchorAPI.Types.Error>) -> Void)? = nil) {
//          let body: Types.Request.Empty? = nil
//          fetch(.teams(username: username), bearerToken: sessionToken, body: body) { (result: Result<[IrohAnchorAPI.Types.Response.AnchorInfo], IrohAnchorAPI.Types.Error>) in
//            callback?(result)
//          }
//      }
      
      func docs(
        _ username: String,
        _ project: String,
        _ sessionToken: String,
        limit: Int = 100,
        offset: Int = 0,
        then callback: ((Result<[IrohAnchorAPI.Types.Response.DocumentInfo], IrohAnchorAPI.Types.Error>) -> Void)? = nil) {
          let body: Types.Request.Empty? = nil
          fetch(.docs(username: username, project: project, limit: limit, offset: offset), bearerToken: sessionToken, body: body) { (result: Result<[IrohAnchorAPI.Types.Response.DocumentInfo], IrohAnchorAPI.Types.Error>) in
            callback?(result)
          }
      }
      
      func inviteToDocMutation(
        _ username: String,
        _ project: String,
        _ sessionToken: String,
        _ name: String,
        _ ticket: String,
        then callback: ((Result<IrohAnchorAPI.Types.Response.DocumentInfo, IrohAnchorAPI.Types.Error>) -> Void)? = nil) {
          let body = Types.Request.DocJoin(name: name, ticket: ticket)
          fetch(.docJoin(username: username, project: project), bearerToken: sessionToken, method: .post, body: body) { (result: Result<IrohAnchorAPI.Types.Response.DocumentInfo, IrohAnchorAPI.Types.Error>) in
              callback?(result)
          }
        }
    }

}
