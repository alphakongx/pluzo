//
//  Mode.swift
//  Pluzo
//
//  Created by new830 on 2/1/21.
//

import Foundation

//enum Mode: String {
//    case masks
//    case effects
//    case filters
//}

enum Masks: String, CaseIterable {
    case none
    case aviators
    case grumpycat
    case flowers
    case lion
    case fatify
    case koala
    case bigmouth
    case dalmatian
    case mudMask
    case pug
    case slash
    case sleepingmask
    case smallface
    case teddycigar
    case tripleface
    case twistedFace
}

//enum Effects: String, CaseIterable {
//    case none
//    case fire
//    case heart
//    case blizzard
//    case rain
//}
//
//enum Filters: String, CaseIterable {
//    case none
//    case tv80
//    case drawingmanga
//    case sepia
//    case bleachbypass
//    case realvhs
//    case filmcolorperfection
//}

extension String {
    var path: String? {
        return Bundle.main.path(forResource: self, ofType: nil)
    }
}
