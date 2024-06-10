//
//  ShareDoc.swift
//  IrohApp
//
//  Created by Brendan O'Brien on 9/14/23.
//

import SwiftUI
import IrohLib

struct ShareDoc: View {
  var doc: Doc
  var done: () -> ()

  var body: some View {
    
    Button("Done") {
      done()
    }
    
    if let invite = try? doc.share(mode: ShareMode.write, addrOptions: AddrInfoOptions.id) {
      VStack(alignment: .leading) {
        Text("ticket:")
          .font(Font.custom("Space Mono", size: 20))
        Text(invite)
          .font(Font.custom("Space Mono", size: 14))
          .foregroundColor(.secondary)
        Button {
          UIPasteboard.general.string = invite
        } label: {
          VStack {
            Image(systemName: "clipboard")
            Text("copy ticket")
          }
        }
        if let image = generateQRCode(from: invite) {
          Image(uiImage: image)
        }
      }.padding(20)
    }
  }

  func generateQRCode(from string: String) -> UIImage? {
      let data = string.data(using: String.Encoding.ascii)

      if let filter = CIFilter(name: "CIQRCodeGenerator") {
          filter.setValue(data, forKey: "inputMessage")
          let transform = CGAffineTransform(scaleX: 3, y: 3)

          if let output = filter.outputImage?.transformed(by: transform) {
              return UIImage(ciImage: output)
          }
      }

      return nil
  }
}
