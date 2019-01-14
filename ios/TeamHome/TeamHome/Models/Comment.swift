//
//  Comment.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import Foundation

class Comment {
    let identifier: UUID
    let user: User
    let team: UUID
    let content: String
    let likes: [UUID] //ids for users that liked the comment
    
    init(identifier: UUID, user: User, team: UUID, content: String, likes: [UUID]) {
        self.identifier = identifier
        self.user = user
        self.team = team
        self.content = content
        self.likes = likes
    }
}
