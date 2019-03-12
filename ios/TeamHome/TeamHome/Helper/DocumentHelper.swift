//
//  DocumentHelper.swift
//  TeamHome
//
//  Created by Andrew Dhan on 3/12/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import Foundation

enum DocumentHelper {
    static func displayTagText(tag: String) -> String{
        if tag.first == "#"{
            return tag
        } else {
            return "#\(tag)"
        }
    }
}
