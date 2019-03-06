//
//  Appearance.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/28/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import Foundation
import UIKit
import Material

enum Appearance {
    static let darkBackgroundColor = UIColor(red: 23/255.0, green: 19/255.0, blue: 27/255.0, alpha: 1.0)
    static let buttonBackgroundColor = UIColor(red: 121/255.0, green: 46/255.0, blue: 74/255.0, alpha: 1.0)
    static let lightMauveColor = UIColor(red: 120/255.0, green: 69/255.0, blue: 85/255.0, alpha: 1.0)
    static let mauveColor = UIColor(red: 121/255.0, green: 46/255.0, blue: 74/255.0, alpha: 1.0)
    static let darkMauveColor = UIColor(red: 45/255.0, green: 25/255.0, blue: 38/255.0, alpha: 1.0)
    static let yellowColor = UIColor(red: 250/255.0, green: 237/255.0, blue: 38/255.0, alpha: 1.0)
    static let grayColor = UIColor(red: 90/255.0, green: 85/255.0, blue: 96/255.0, alpha: 1.0)
    static let plumColor = UIColor(red: 62/255.0, green: 49/255.0, blue: 69/255.0, alpha: 1.0)
    static let beigeColor = UIColor(red: 157/255.0, green: 141/255.0, blue: 143/255.0, alpha: 1.0)
    static let likeGrayColor = UIColor(red: 118/255.0, green: 117/255.0, blue: 125/255.0, alpha: 1.0)
    
    static func setTheme() {
        UIButton.appearance().tintColor = Appearance.yellowColor
        
        UINavigationBar.appearance().barTintColor = Appearance.darkMauveColor
        UINavigationBar.appearance().isTranslucent = false
        UINavigationBar.appearance().titleTextAttributes = [NSAttributedString.Key.foregroundColor: UIColor.white]
        UIBarButtonItem.appearance().tintColor = .white
        let titleFont = Appearance.setTitleFont(with: .title1, pointSize: 20)
        let titleAttributes = [NSAttributedString.Key.font: titleFont, NSAttributedString.Key.foregroundColor: Appearance.yellowColor]
        let titleLargeFont = Appearance.setTitleFont(with: .title1, pointSize: 30)
        let titleLargeAttributes = [NSAttributedString.Key.font: titleLargeFont, NSAttributedString.Key.foregroundColor: Appearance.yellowColor]
        
        UINavigationBar.appearance().titleTextAttributes = titleAttributes
        UINavigationBar.appearance().largeTitleTextAttributes = titleLargeAttributes
        
        UITabBar.appearance().barTintColor = Appearance.plumColor
        UITabBar.appearance().tintColor = Appearance.yellowColor
        UITabBar.appearance().unselectedItemTintColor = .white
        UITabBarItem.appearance().setTitleTextAttributes([NSAttributedString.Key.foregroundColor: Color.white], for: .normal)
        UITabBarItem.appearance().setTitleTextAttributes([NSAttributedString.Key.foregroundColor: Appearance.yellowColor], for: .selected)
        
        UITextField.appearance().keyboardAppearance = .dark
        UISwitch.appearance().onTintColor = Appearance.mauveColor
        UISegmentedControl.appearance().tintColor = Appearance.plumColor
        UISegmentedControl.appearance().setTitleTextAttributes([NSAttributedString.Key.foregroundColor: Appearance.yellowColor], for: .selected)
        UISegmentedControl.appearance().setTitleTextAttributes([NSAttributedString.Key.foregroundColor: Appearance.yellowColor], for: .normal)
    }
    
    // Style button with button background color
    static func styleLandingPage(button: UIButton) {
        button.backgroundColor = Appearance.darkMauveColor
        button.layer.cornerRadius = button.frame.height / 2
        button.contentEdgeInsets.top = 10
        button.contentEdgeInsets.bottom = 10
        button.layer.borderWidth = 0
        button.layer.borderColor = Appearance.yellowColor.cgColor
        button.setTitleColor(.white, for: .normal)
    }
    
    static func styleOrange(button: UIButton) {
        button.backgroundColor = .clear
        button.layer.borderWidth = 1
        button.layer.borderColor = Appearance.yellowColor.cgColor
        button.layer.cornerRadius = 6
        button.contentEdgeInsets.top = 10
        button.contentEdgeInsets.bottom = 10
        button.contentEdgeInsets.left = 10
        button.contentEdgeInsets.right = 10
        button.tintColor = Appearance.plumColor
        button.setTitleColor(.white, for: .normal)
    }
    
    static func setTitleFont(with textStyle: UIFont.TextStyle, pointSize: CGFloat) -> UIFont {
        guard let font = UIFont(name: "Comfortaa", size: pointSize) else {
            fatalError("The font wasn't found. Check the name again.")
        }
        
        return UIFontMetrics(forTextStyle: textStyle).scaledFont(for: font)
    }
}

extension UIViewController {
    func setUpViewAppearance() {
        view.backgroundColor = Appearance.grayColor
        
        UILabel.appearance().textColor = .white
        
    }
    
}
