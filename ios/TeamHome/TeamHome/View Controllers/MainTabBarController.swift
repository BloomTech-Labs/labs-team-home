//
//  MainTabBarController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Auth0

protocol TabBarChildrenProtocol: class {
    var team: AllTeamsQuery.Data.Team? { get set }
    var credentials: Credentials? { get set }
}

class MainTabBarController: UITabBarController {

    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        //Pass variables to all child VCs
//        for childVC in children {
//            if let childVC = childVC as? UINavigationController {
//                guard let nextVC = childVC.viewControllers.first else { return }
//                if let nextVC = nextVC as? TabBarChildrenProtocol {
//                    guard let team = team else { return }
//                    nextVC.team = team
//                }
//            }
//        }
    }
}
