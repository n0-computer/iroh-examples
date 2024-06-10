//
//  IrohNodeManager.swift
//  iroh
//
//  Created by Brendan O'Brien on 8/8/23.
//

import SwiftUI
import IrohLib
import Foundation

class IrohNodeManager: ObservableObject {
  static let shared = IrohNodeManager()

  @Published var node: IrohNode?
  @Published var nodeID: String = ""
  @Published var author: AuthorId?
  @Published var nodeStats: [String : CounterStats]?
  @Published var historicalStats: [IrohAnchorAPI.Types.Response.EgressDaily]?
  @Published var connections: [ConnectionInfoIdentifiable]?
  @Published var connectionHistories: [String: [ConnHistory]] = [:]
  
  // stats we've collected for this process session
  private var sessionHistoricalStat: IrohAnchorAPI.Types.Response.EgressDaily? = nil
  // record of stats we've already written for this session, to avoid double-writing
  private var lastWriteStats: IrohAnchorAPI.Types.Response.EgressDaily? = nil
  
  private var timer: Timer?
  
  func start() {
//    IrohLib.setLogLevel(level: .debug)
    do {
      try IrohLib.startMetricsCollection()
      let path = self.irohPath()
      print(path.absoluteString)
      self.node = try IrohNode(path: path.path)
      nodeID = node?.nodeId() ?? ""
      startConnectionMonitoring()
      startStatsMonitoring()
      initAuthor()
      self.historicalStats = initHistoricalStats(nodeID)
      print("created iroh node with node Id \(nodeID)")
    } catch {
      print("error creating iroh node \(error)")
    }
  }
  
  // TODO: using a single author for now. At some point we should add support for author selection
  private func initAuthor() {
    do {
      self.author = try self.node?.authorCreate()
    } catch {
      print("couldn't create author \(error)")
      return
    }
  }
  
  
  private func startConnectionMonitoring() {
    updateConnections()
    DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
      self.startConnectionMonitoring()
    }
  }
  
  private func updateConnections() {
    guard let node = node else {
      print("Error: no node")
      return
    }

    do {
      let connections = try node.connections()

      DispatchQueue.global(qos: .userInteractive).async {
        let mapped = connections.map { (conn) -> ConnectionInfoIdentifiable in
          let nodeId = conn.nodeId.toString()
          let item = ConnHistory(
            id: .now,
            latency: conn.latency != nil ? conn.latency! * 1000 : 0,
            connType: conn.connType)

          DispatchQueue.main.async {
            if self.connectionHistories[nodeId] != nil {
              self.connectionHistories[nodeId]?.append(item)
            } else {
              self.connectionHistories[nodeId] = [item]
            }

            if self.connectionHistories[nodeId]?.count ?? 0 >= 300 {
              let _ = self.connectionHistories[nodeId]!.popLast()
            }
          }

          return ConnectionInfoIdentifiable(
            id: nodeId,
            latency: conn.latency != nil ? conn.latency! * 1000 : nil,
            connType: conn.connType)
        }
        
        DispatchQueue.main.async {
          self.connections = mapped
        }
      }
    } catch {
      print("error fetching connections")
    }
  }
  
  private func startStatsMonitoring() {
    timer = Timer.scheduledTimer(withTimeInterval: 3, repeats: true) { _ in
      do {
        if let latest = try self.node?.stats() {
          
          DispatchQueue.main.async {
            self.nodeStats = latest
          }
          
          // todo: should be "bytes_sent", but that doesn't seem to increase?
          if let sentStat = latest["send_data"] {
            // update latest historical stats
            self.sessionHistoricalStat = IrohAnchorAPI.Types.Response.EgressDaily(
              date: self.currentHistoricalStatsDate(),
              egress_bytes: Int(sentStat.value),
              egress_blobs: 0, // TODO
              requests: 0, // TODO
              nodeId: self.nodeID)
            self.writeHistoricalStatsToDisk()
          }

        }
      } catch (let error) {
        print("error \(error)")
        self.timer?.invalidate()
        self.timer = nil
      }
    }
  }
  
  private func initHistoricalStats(_ nodeID: String) -> [IrohAnchorAPI.Types.Response.EgressDaily] {
    if var hs = readHistoricalStatsFromDisk() {

      if hs.count == 0 {
        return[self.initStat(nodeID)]
      }
      
      // add today to front of list if it doesn't exist
      if hs.first?.date != currentHistoricalStatsDate() {
        hs.insert(self.initStat(nodeID), at: 0)
      }
      
      return hs
    }
    
    return [self.initStat(nodeID)]
  }
  
  private func irohPath() -> URL {
    let paths = FileManager.default.urls(for: .libraryDirectory, in: .userDomainMask)
    let irohPath = paths[0].appendingPathComponent("iroh")
    mkdirP(path: irohPath.path)
    return irohPath
  }
  
  private func historicalStatsPath() -> URL {
    let sessionTokenFilename = "iroh_node_stats.json"
    let paths = FileManager.default.urls(for: .libraryDirectory, in: .userDomainMask)
    return paths[0].appendingPathComponent(sessionTokenFilename)
  }
  
  private func currentHistoricalStatsDate() -> Date {
    var cal = Calendar.current
    cal.timeZone = TimeZone(secondsFromGMT: 0)!
    return cal.startOfDay(for: .now)
  }
  
  private func initStat(_ nodeID: String) -> IrohAnchorAPI.Types.Response.EgressDaily {
    return .init(
      date: currentHistoricalStatsDate(),
      egress_bytes: 0,
      egress_blobs: 0,
      requests: 0,
      nodeId: nodeID)
  }
  
  private func writeHistoricalStatsToDisk() {
    if sessionHistoricalStat == lastWriteStats {
      // nothing to write
      return
    }
    
    print("writing historical stats")
    
    do {
      guard let latest = sessionHistoricalStat else {
        return
      }
      
      // re-read to ensure we're on the current date
      var hs = self.initHistoricalStats(nodeID)
      
      var top = hs.first!
      top.egress_bytes += latest.egress_bytes - (lastWriteStats?.egress_bytes ?? 0)
      hs[0] = top
      
      let data = try JSONEncoder().encode(hs)
      try data.write(to: self.historicalStatsPath())
      lastWriteStats = .init(date: currentHistoricalStatsDate(),
                             egress_bytes: latest.egress_bytes,
                             egress_blobs: latest.egress_blobs,
                             requests: latest.requests,
                             nodeId: nodeID)
      self.historicalStats = hs
      print("wrote historical stats to disk")
    } catch {
      print("error writing historical stats to file")
    }
  }
  
  private func readHistoricalStatsFromDisk() -> [IrohAnchorAPI.Types.Response.EgressDaily]? {
    do {
      if let jsonData = try String(contentsOf: self.historicalStatsPath(), encoding: String.Encoding.utf8).data(using: .utf8) {
        let contents = try JSONDecoder().decode([IrohAnchorAPI.Types.Response.EgressDaily].self, from: jsonData)
        return contents
      }
    } catch {}
    return nil
  }
}

struct IrohNodeManagerEnvironmentKey: EnvironmentKey {
    static var defaultValue: IrohNodeManager = IrohNodeManager.shared
}

extension EnvironmentValues {
    var irohNodeManager: IrohNodeManager {
        get { self[IrohNodeManagerEnvironmentKey.self] }
        set { self[IrohNodeManagerEnvironmentKey.self] = newValue }
    }
}

struct ConnectionInfoIdentifiable: Identifiable, Equatable {
  var id: String
  var latency: Double?
  var connType: ConnectionType

  static func == (lhs: ConnectionInfoIdentifiable, rhs: ConnectionInfoIdentifiable) -> Bool {
    lhs.id == rhs.id
  }

  func latencyString() -> String {
    if let latency = latency {
      return String(format:"%.1f", latency)
    }
    return "?"
  }
}

struct ConnHistory: Identifiable {
  var id: Date
  var latency: Double
  var connType: ConnectionType
}

func mkdirP(path: String) {
    let fileManager = FileManager.default
    
    do {
        try fileManager.createDirectory(atPath: path,
                                        withIntermediateDirectories: true,
                                        attributes: nil)
    } catch {
        print("Error creating directory: \(error)")
    }
}
