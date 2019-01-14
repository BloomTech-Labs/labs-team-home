//
//  Message.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 MIT to Lambda School. All rights reserved.
//

import Foundation

class Message {
    let identifier: UUID
    let user: User
    let team: Team
    let title: String
    let content: String
    let images: [String] //[URL]?
    let tags: [UUID]
    let comments: [UUID]
    let subscribedUsers: [UUID]
    
    init(identifier: UUID, user: User, team: Team, title: String, content: String, images: [String], tags: [UUID], comments: [UUID], subscribedUsers: [UUID]) {
        self.identifier = identifier
        self.user = user
        self.team = team
        self.title = title
        self.content = content
        self.images = images
        self.tags = tags
        self.comments = comments
        self.subscribedUsers = subscribedUsers
    }
}
