//
//  DocEntry.swift
//  IrohApp
//
//  Created by Brendan O'Brien on 8/27/23.
//

import SwiftUI
import IrohLib

struct DocEntry: View {
  @EnvironmentObject var nodeManager: IrohNodeManager
  var doc: Doc
  var entry: HashableEntry

  @State var value: Data?
  @State var fetchingValue: Bool = true
  
  var body: some View {
    VStack(alignment: .leading, spacing: 10) {
      Text("doc entry")
        .font(Font.custom("Space Mono", size: 24))
        .foregroundColor(.primary)
        .frame(maxWidth: .infinity, alignment: .leading)
      
      Text("KEY")
        .font(Font.caption)
        .foregroundColor(.secondary)
      Text(entry.key)
        .font(Font.custom("Space Mono", size: 16))
        .foregroundColor(.primary)
        Text("HASH")
          .font(Font.caption)
          .foregroundColor(.secondary)
      Text(entry.hash.toString())
          .font(Font.custom("Space Mono", size: 16))
          .foregroundColor(.secondary)
      if let value = value {
        Text("VALUE SIZE")
          .font(Font.caption)
          .foregroundColor(.secondary)
        Text(ByteCountFormatter.string(fromByteCount: Int64(value.count), countStyle: .file))
          .font(Font.custom("Space Mono", size: 16))
          .foregroundColor(.primary)
        Text("VALUE")
          .font(Font.caption)
          .foregroundColor(.secondary)

        if entry.key.hasSuffix(".jpg") {
          if let uiImage = UIImage(data: value) {
            Image(uiImage: uiImage)
              .resizable()
              .scaledToFit()
          } else {
            Text(".jpg extension is not a JPEG image")
          }
        } else {
          if let string = String(data: value, encoding: .utf8) {
            Text(string)
          } else {
            Text("value is not a utf-8 string")
          }
        }
      } else if fetchingValue {
        Text("loading value...")
      }
      Spacer()
    }
    .padding(20)
    .onAppear() {
      self.loadContent()
    }
  }
  
  private func loadContent() {
    self.fetchingValue = true
    do {
      self.value = try self.nodeManager.node?.blobsReadToBytes(hash: entry.hash)
      self.fetchingValue = false
    } catch (let failure) {
      print("error fetching \(entry.hash.toString()): \(failure.localizedDescription)")
    }
  }
}
