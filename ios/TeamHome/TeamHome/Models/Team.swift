//
//  Team.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import Foundation

class Team {
    let identifier: UUID
    let name: String
    let admins: [User] //only users where admin = true
    let premium: Bool
    
    init(name: String, admins: [User], premium: Bool, identifier: UUID) {
        self.identifier = identifier
        self.name = name
        self.admins = admins
        self.premium = premium
    }
    
}
