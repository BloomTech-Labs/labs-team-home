//
//  User.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import Foundation

struct User {
    let identifier: UUID
    let firstName: String
    let lastName: String
    let email: String
    let phoneNumber: String
    let avatar: String //or URL?
    let receiveEmails: Bool
    let receiveTexts: Bool
}
