//
//  AnchorEgressSummaryStats.swift
//  IrohApp
//
//  Created by Brendan O'Brien on 9/13/23.
//

import SwiftUI

struct AnchorEgressSummaryStats: View {
    let egress: IrohAnchorAPI.Types.Response.Egress
  
    var body: some View {
      HStack(alignment: .top, spacing: 0) {
        Text("last 30 days")
          .font(Font.custom("Space Grotesk", size: 15).weight(.light))
          .lineSpacing(22)
          .foregroundColor(.black)
      }

      HStack(alignment: .center, spacing: 20) {
        VStack(spacing: 10) {
          Text(ByteCountFormatter.string(fromByteCount: Int64(egress.summary.egress_bytes), countStyle: .file))
            .font(Font.custom("Space Mono", size: 24).weight(.bold))
            .lineSpacing(34)
            .foregroundColor(Color(red: 0.14, green: 0.16, blue: 0.20))
          Text("BLOBS")
            .font(Font.custom("Space Mono", size: 13))
            .lineSpacing(23)
            .foregroundColor(.secondary)
        }
        VStack(spacing: 10) {
          Text(String(format: "%d", egress.summary.requests))
            .font(Font.custom("Space Mono", size: 24).weight(.bold))
            .lineSpacing(34)
            .foregroundColor(Color(red: 0.14, green: 0.16, blue: 0.20))
          Text("REQUESTS")
            .font(Font.custom("Space Mono", size: 13))
            .lineSpacing(23)
            .foregroundColor(.secondary)
        }
        VStack(spacing: 10) {
          Text(String(format: "%d", egress.summary.egress_blobs))
            .font(Font.custom("Space Mono", size: 24).weight(.bold))
            .lineSpacing(34)
            .foregroundColor(Color(red: 0.14, green: 0.16, blue: 0.20))
          Text("BLOBS")
            .font(Font.custom("Space Mono", size: 13))
            .lineSpacing(23)
            .foregroundColor(.secondary)
        }
      }
        .frame(maxWidth: .infinity)
    }
}

struct AnchorEgressSummaryStats_Previews: PreviewProvider {
  static var previews: some View {
    AnchorEgressSummaryStats(egress: mockEgress())
  }
}
