//
//  DashboardTeamCollectionViewCell.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/16/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Material

protocol TeamCellDelegate: class {
    func presentActionSheet(with optionMenu: UIAlertController)
}

class DashboardTeamCollectionViewCell: UICollectionViewCell {
    
    fileprivate func prepareFavoriteButton() {
        favoriteButton = IconButton(image: Icon.favorite, tintColor: Color.red.base)
    }
    
    private func prepareBottomBar() {
        bottomBar = Bar()
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
        moreButton.addTarget(self, action: #selector(presentActionSheet(_:)), for: .touchUpInside)
        
        // If current user is admin show them delete functionality.
//        if message.user.id == currentUser.id {
//            moreButton.addTarget(self, action: #selector(presentDeleteActionSheet(_:)), for: .touchUpInside)
//        }
        
        
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
    
    @objc func presentActionSheet(_ sender: IconButton) {
        let optionMenu = UIAlertController(title: nil, message: "Message Options", preferredStyle: .actionSheet)
        
        let viewAction = UIAlertAction(title: "View", style: .default)
        let cancelAction = UIAlertAction(title: "Cancel", style: .cancel)
        
        optionMenu.addAction(viewAction)
        optionMenu.addAction(cancelAction)
        
        delegate?.presentActionSheet(with: optionMenu)
    }
    
    @objc func presentDeleteActionSheet(_ sender: IconButton) {
        let optionMenu = UIAlertController(title: nil, message: "Message Options", preferredStyle: .actionSheet)
        
        let deleteAction = UIAlertAction(title: "Delete", style: .destructive)
        let viewAction = UIAlertAction(title: "View", style: .default)
        let cancelAction = UIAlertAction(title: "Cancel", style: .cancel)
        
        optionMenu.addAction(deleteAction)
        optionMenu.addAction(viewAction)
        optionMenu.addAction(cancelAction)
        
        delegate?.presentActionSheet(with: optionMenu)
    }
    
    // MARK: - Properties
    
    weak var delegate: TeamCellDelegate?
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
