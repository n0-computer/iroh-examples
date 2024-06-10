//
//  ConfigurationHome.swift
//  iroh
//
//  Created by Brendan O'Brien on 7/4/23.
//

import SwiftUI

struct AnchorHome: View {
  @EnvironmentObject var sessionInfo: UserSession
  @EnvironmentObject var nodeManager: IrohNodeManager

  var body: some View {
    Group {
      if sessionInfo.sessionToken == "" {
        Login()
      } else {
        VStack(alignment: .leading, spacing: 20) {
          Topbar()
          VStack(alignment: .leading, spacing: 0) {
            Text(sessionInfo.anchorName)
              .font(Font.custom("Space Mono", size: 32))
              .foregroundColor(.primary)
              .frame(maxWidth: .infinity, alignment: .leading)
            Text("\(sessionInfo.anchorName).iroh.network")
              .font(Font.custom("Space Mono", size: 16))
              .lineSpacing(23)
              .foregroundColor(.secondary)
              .frame(maxWidth: .infinity, alignment: .leading)
          }
          .padding(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 0))
          .frame(maxWidth: .infinity)
//          if let egress = sessionInfo.anchorEgress {
//            AnchorEgressSummaryStats(egress: egress)
//          }
//          if let egress = self.anchorAndLocalEgressHistory() {
//            DailyEgressBarChart(title: "ANCHOR EGRESS", egress: egress)
//          }
          Spacer()
//          if let docs = sessionInfo.documents {
//            List {
//              Section("docs") {
//                ForEach(docs, id: \.self) { doc in
//                  Text(doc.doc_id.trunc(length: 15))
//                }
//              }
//            }
//          }
        }
        .padding(20)
      }
    }
  }
  
//  private func anchorAndLocalEgressHistory() -> [IrohAnchorAPI.Types.Response.EgressDaily]? {
//    guard var anchorEgress = sessionInfo.anchorEgress?.daily else {
//      return nil
//    }
//    
//    // TODO b5 - hack to deal with server returning bonkers dates
//    let calendar = Calendar.current
//
//    for (index, stat) in anchorEgress.enumerated() {
//      let year = calendar.component(.year, from: stat.date)
//      if year > 2023 {
//        var dateComponents = DateComponents()
//        dateComponents.year = 2023
//        
//        let originalComponents = calendar.dateComponents([.month, .day, .hour, .minute, .second], from: stat.date)
//        dateComponents.month = originalComponents.month
//        dateComponents.day = originalComponents.day
//        dateComponents.hour = originalComponents.hour
//        dateComponents.minute = originalComponents.minute
//        dateComponents.second = originalComponents.second
//        
//        if let newDate = calendar.date(from: dateComponents) {
//            var updatedStruct = stat
//            updatedStruct.date = newDate
//            anchorEgress[index] = updatedStruct
//        }
//      }
//    }
//
//    
//    guard let localEgress = nodeManager.historicalStats else {
//      return anchorEgress
//    }
//    
//    return anchorEgress + localEgress
//  }

  private func formatDate(date: Date) -> String {
    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = "HH:mm:ss"
    dateFormatter.locale = Locale(identifier: "en_US_POSIX")
    return dateFormatter.string(from: date)
  }
}

struct AnchorHome_Previews: PreviewProvider {
  static var previews: some View {
    let session = UserSession()
    AnchorHome()
      .environmentObject(session)
      .environmentObject(IrohNodeManager.shared)
      .onAppear() {
        IrohNodeManager.shared.start()
      }
  }
}
