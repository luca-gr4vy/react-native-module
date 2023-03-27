//
//  ModuleEvents.swift
//  Module
//
//  Created by Paul Levetsky on 02/03/2023.
//

import Foundation

@objc(ModuleEvents)
open class ModuleEvents: RCTEventEmitter {

  public static var emitter: RCTEventEmitter!

  override init() {
    super.init()
    ModuleEvents.emitter = self
  }

  @objc override public static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  open override func supportedEvents() -> [String] {
    ["onPaymentMethodSelected"]
  }
}
