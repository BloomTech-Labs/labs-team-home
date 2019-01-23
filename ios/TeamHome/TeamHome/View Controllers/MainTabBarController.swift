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
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser? { get set }
    var apollo: ApolloClient? { get set }
}

class MainTabBarController: UITabBarController {

}
