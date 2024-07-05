//
//  MockData.swift
//  IrohApp
//
//  Created by Brendan O'Brien on 9/13/23.
//

import Foundation

func mockEgress() -> IrohAnchorAPI.Types.Response.Egress {
  return IrohAnchorAPI.Types.Response.Egress(
    summary: IrohAnchorAPI.Types.Response.EgressSummary(
      egress_bytes: 1234567,
      egress_blobs: 100,
      requests: 100),
    daily: [
      .init(date: Date(timeIntervalSince1970: 1694476800), egress_bytes: 1190875, egress_blobs: 2, requests: 2),
      .init(date: Date(timeIntervalSince1970: 1694563200), egress_bytes: 1173811, egress_blobs: 34, requests: 34),
    ]
  )
}
