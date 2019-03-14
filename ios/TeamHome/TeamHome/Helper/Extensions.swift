//
//  Extensions.swift
//  TeamHome
//
//  Created by Andrew Dhan on 3/13/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import Foundation
import UIKit


extension UICollectionViewController{
    func scrollToBottom(animated: Bool = false){
        let lastItemIndex = self.collectionView.numberOfItems(inSection: 0) - 1
        let indexPath:IndexPath = IndexPath(item: lastItemIndex, section: 0)
        self.collectionView.scrollToItem(at: indexPath, at: .bottom, animated: animated)
    }
}

