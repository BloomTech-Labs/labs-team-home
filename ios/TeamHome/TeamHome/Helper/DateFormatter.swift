//
//  DateFormatter.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/29/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import Foundation

extension Double {
    
    // Convert UNIX time to formatted string.
    func getDateStringFromUTC() -> String {
        // Convert UNIX time to Date.
        let date = Date(timeIntervalSince1970: self)
        
        // Create date formatter and set format (ex: Jan 23 06:34 PM).
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "MMM d h:mm a"
        
        // Return date as string.
        return dateFormatter.string(from: date)
    }
}
