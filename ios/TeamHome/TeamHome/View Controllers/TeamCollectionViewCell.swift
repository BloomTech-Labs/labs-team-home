//
//  TeamCollectionViewCell.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/16/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Material

class TeamCollectionViewCell: UICollectionViewCell {
    
    fileprivate func prepareFavoriteButton() {
        favoriteButton = IconButton(image: Icon.favorite, tintColor: Color.red.base)
    }
    
    private func prepareBottomBar() {
        bottomBar = Bar()
        
        bottomBar.leftViews = [favoriteButton]
        bottomBar.backgroundColor = .clear
    }
    
    func setTheme() {
        
        prepareFavoriteButton()
        prepareBottomBar()
        
        moreButton = IconButton(image: Icon.cm.moreVertical, tintColor: Color.grey.base)
        
        toolbar = Toolbar(rightViews: [moreButton])
        
        toolbar.title = "team"
        toolbar.titleLabel.textAlignment = .left
        toolbar.titleLabel.textColor = .white
        toolbar.detail = "premium?"
        toolbar.detailLabel.textAlignment = .left
        toolbar.detailLabel.textColor = Color.grey.base
        toolbar.backgroundColor = .clear
        
        card.toolbar = toolbar
        card.toolbarEdgeInsetsPreset = .square3
        card.toolbarEdgeInsets.bottom = 0
        card.toolbarEdgeInsets.right = 8
        card.backgroundColor = Appearance.plumColor
        
        card.bottomBar = bottomBar
        card.bottomBarEdgeInsetsPreset = .wideRectangle2
        
    }
    
    // MARK - Properties
    
    private var toolbar: Toolbar!
    private var moreButton: IconButton!
    
    private var favoriteButton: IconButton!
    private var bottomBar: Bar!
    
    @IBOutlet weak var card: Card!
    
}
