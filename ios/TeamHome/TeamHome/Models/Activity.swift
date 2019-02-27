//
//  Activity.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/24/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import Foundation
import Apollo

struct Activity {
    let message: FindActivityByTeamQuery.Data.FindMessagesByTeam?
    let comment: FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage?
    let document: FindDocumentsByTeamQuery.Data.FindDocumentsByTeam?
    let date: String?
}
