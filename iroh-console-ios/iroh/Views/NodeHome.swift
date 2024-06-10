//
//  NodeHome.swift
//  IrohApp
//
//  Created by Brendan O'Brien on 9/14/23.
//

import SwiftUI
import IrohLib
import Charts

struct NodeHome: View {
  @EnvironmentObject var nodeManager: IrohNodeManager
  @State var showAdvancedStats: Bool = false

  var body: some View {
    Group {
      if nodeManager.node != nil {
        VStack {
          VStack {
            Text("Node")
              .font(Font.custom("Space Mono", size: 32))
              .foregroundColor(.primary)
              .frame(maxWidth: .infinity, alignment: .leading)
            Text("ID: \(nodeManager.nodeID.trunc(length: 12))")
              .font(Font.custom("Space Mono", size: 16))
              .foregroundColor(.secondary)
              .frame(maxWidth: .infinity, alignment: .leading)
          }.padding(10)
          
          if let conns = nodeManager.connections {
            List {
              Section("Connections") {
                if conns.count == 0 {
                  HStack {
                    Spacer()
                    Text("No Connections")
                      .font(Font.headline)
                      .foregroundColor(Color.gray)
                    Spacer()
                  }
                    .listRowBackground(Color.clear)
                    .listRowSeparator(.hidden)
                }
                ForEach(conns) { conn in
                  VStack {
                    HStack {
                      Text("\(conn.id.trunc(length: 12))")
                        .fontWeight(.bold)
                      Spacer()
                      Text("\(self.connTypeString(conn.connType)) \(conn.latencyString())ms")
                    }
                    if let data = nodeManager.connectionHistories[conn.id] {
                      Chart {
                        ForEach(data) { d in
                          LineMark(
                            x: .value("Date", d.id),
                            y: .value("Latency", d.latency)
                          )
                          .foregroundStyle(by: .value("Connection Type", self.connTypeInt(d.connType)))
                        }
                      }
                      .frame(maxHeight: 60)
                      .chartLegend(.hidden)
//                      .chartYAxis {
//                        AxisMarks(values: .automatic(desiredCount: 4)) { value in
//                          if let bytes = value.as(Double.self) {
//                            AxisValueLabel()
//                          }
//                          AxisGridLine()
//                          AxisTick()
//                        }
//                      }
                    }
                  }
                }
              }
              
              if let hs = nodeManager.historicalStats {
                Section("data served") {
                  if hs.count > 0 && hs[0].egress_bytes > 0 {
                    Chart {
                      ForEach(hs, id: \.date) { day in
                        BarMark(
                          x: .value("Date", day.date),
                          y: .value("Total Count", day.egress_bytes)
                        )
                      }
                    }
                    .frame(maxHeight: 180)
                    .chartYAxis {
                      AxisMarks(values: .automatic(desiredCount: 4)) { value in
                        if let bytes = value.as(Int64.self) {
                          AxisValueLabel(ByteCountFormatter.string(fromByteCount: bytes, countStyle: .file))
                        }
                        AxisGridLine()
                        AxisTick()
                      }
                    }
                  } else {
                    HStack {
                      Spacer()
                      Text("No Data Served")
                        .font(Font.headline)
                        .foregroundColor(Color.gray)
                      Spacer()
                    }
                  }
                }
              }
              
              if let stats = nodeManager.nodeStats {
                Section("Stats") {
                  Button(showAdvancedStats ? "hide advanced stats" : "show advanced stats") {
                    showAdvancedStats = !showAdvancedStats
                  }
                  .font(Font.custom("Space Mono", size: 16))

                  if showAdvancedStats {
                    ForEach(Array(stats.keys.sorted()), id: \.self) { key in
                      if let stat = stats[key] {
                        HStack{
                          VStack {
                            Text(key)
                              .font(Font.custom("Space Mono", size: 14))
                              .foregroundColor(.primary)
                              .frame(maxWidth: .infinity, alignment: .leading)
                            Text(stat.description)
                              .font(.system(size: 12))
                              .foregroundColor(.secondary)
                              .frame(maxWidth: .infinity, alignment: .leading)
                          }
                          Text("\(stat.value)")
                            .frame(maxWidth: 100, alignment: .trailing)
                        }
                      }
                    }
                  } else {
                    ForEach(["send_data", "recv_data_ipv4"], id: \.self) { key in
                      if let stat = stats[key] {
                        HStack{
                          VStack {
                            Text(key)
                              .font(Font.custom("Space Mono", size: 14))
                              .foregroundColor(.primary)
                              .frame(maxWidth: .infinity, alignment: .leading)
                            Text(stat.description)
                              .font(.system(size: 10))
                              .foregroundColor(.secondary)
                              .frame(maxWidth: .infinity, alignment: .leading)
                          }
                          Text(ByteCountFormatter.string(fromByteCount: Int64(stat.value), countStyle: .file))
                            .frame(maxWidth: 100, alignment: .trailing)
                        }
                      }
                    }
                  }
                }
              }
              
            }
//            .listStyle(PlainListStyle())
          }
        }
      } else {
        Text("No Node is running")
      }
    }
  }
  
  func connTypeString(_ ct: ConnectionType) -> String {
    switch ct.type() {
    case .mixed:
      return "mixed"
    case .direct:
      return "direct"
    case .relay:
      return "relay"
    case .none:
      return "none"
    }
  }
  
  func connTypeInt(_ ct: ConnectionType) -> Int {
    switch ct.type() {
    case .mixed:
      return 3
    case .direct:
      return 2
    case .relay:
      return 1
    case .none:
      return 0
    }
  }
}

struct NodeHome_Previews: PreviewProvider {
    static var previews: some View {
        NodeHome()
          .environmentObject(IrohNodeManager.shared)
          .onAppear() {
            IrohNodeManager.shared.start()
          }
    }
}
