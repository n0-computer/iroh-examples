//
//  BarChart.swift
//  iroh
//
//  Created by Brendan O'Brien on 7/27/23.
//

import SwiftUI
import Charts

struct DailyEgressBarChart: View {
  var title: String
  var egress: [IrohAnchorAPI.Types.Response.EgressDaily]
  
  var body: some View {
    Chart {
      ForEach(egress, id: \.date) { day in
        BarMark(
          x: .value("Date", day.date),
          y: .value("Total Count", day.egress_bytes)
        )
        .foregroundStyle(by: .value("Node ID", self.nodeIdValue(day.nodeId)))
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
  }
  
  private func nodeIdValue(_ nodeId: String?) -> String {
    if nodeId == nil || nodeId == "" {
      return "remote"
    }

    return "local"
  }
}

struct BarChart_Previews: PreviewProvider {
    static var previews: some View {
      DailyEgressBarChart(title: "chart", egress: mockEgress().daily)
    }
}
