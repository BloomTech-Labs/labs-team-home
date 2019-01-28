//
//  Appearance.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/28/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import Foundation
import UIKit

enum Appearance {
    static let darkBackgroundColor = UIColor(red: 23/255.0, green: 19/255.0, blue: 27/255.0, alpha: 1.0)
    static let buttonBackgroundColor = UIColor(red: 121/255.0, green: 46/255.0, blue: 74/255.0, alpha: 1.0)
    
    
    static func setTheme() {
        UIToolbar.appearance().tintColor = .white
    }
    
    // Style button with button background color
    static func style(button: UIButton) {
        button.backgroundColor = Appearance.buttonBackgroundColor
        button.layer.cornerRadius = 4
        button.contentEdgeInsets.top = 10
        button.contentEdgeInsets.bottom = 10
    }
}
