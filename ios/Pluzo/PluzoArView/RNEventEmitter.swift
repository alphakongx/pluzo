//
//  RNEventEmitter.swift
//  Pluzo
//
//  Created by new830 on 2/3/21.
//

import Foundation

@objc(RNEventEmitter)
open class RNEventEmitter: RCTEventEmitter {

  public static var emitter: RCTEventEmitter!

  override init() {
    super.init()
    RNEventEmitter.emitter = self
  }
  
  open override class func requiresMainQueueSetup() -> Bool {
    return true
  }

  open override func supportedEvents() -> [String] {
    ["onReadyView", "onShutdown", "onFailure"]      // etc.
  }
}
