//
//  DashboardTeamCollectionViewCell.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/16/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Material

class DashboardTeamCollectionViewCell: UICollectionViewCell {
    
    fileprivate func prepareFavoriteButton() {
        favoriteButton = IconButton(image: Icon.favorite, tintColor: Color.red.base)
    }
    
    private func prepareBottomBar() {
        bottomBar = Bar()
//        
//        bottomBar.leftViews = [favoriteButton]
        bottomBar.backgroundColor = .clear
    }
    
    func setTheme() {
        
        guard let team = team else { return }
        
        prepareFavoriteButton()
        prepareBottomBar()
        
        premiumIcon = UIView(frame: CGRect(x: 0, y: 0, width: 30, height: 30))
        let commentImage = UIImage(named: "Premium")!
        let imageView = UIImageView(image: commentImage)
        imageView.frame = CGRect(x: 8, y: 8, width: 24, height: 24)
        imageView.tintColor = .white
        
        if team.premium {
            premiumIcon.addSubview(imageView)
        }
        
        moreButton = IconButton(image: Icon.cm.moreVertical, tintColor: Color.grey.base)
        
        toolbar = Toolbar(rightViews: [premiumIcon, moreButton])
        
        toolbar.title = team.name
        toolbar.titleLabel.textAlignment = .left
        toolbar.titleLabel.textColor = .white
        toolbar.detail = ""
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
    
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser? {
        didSet {
            setTheme()
        }
    }
    
    private var toolbar: Toolbar!
    private var moreButton: IconButton!
    private var premiumIcon: UIView!
    private var favoriteButton: IconButton!
    private var bottomBar: Bar!
    
    @IBOutlet weak var card: Card!
    
}
