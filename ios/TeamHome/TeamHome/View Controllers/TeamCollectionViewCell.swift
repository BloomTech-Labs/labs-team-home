//
//  TeamCollectionViewCell.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/16/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit

class TeamCollectionViewCell: UICollectionViewCell {
    
    func setTheme() {
        
       
        cellView.layer.cornerRadius = 4
        cellView.layer.masksToBounds = true
        cellView.layer.borderWidth = 1.0
        cellView.layer.borderColor = UIColor.clear.cgColor
        
        teamNameLabel.backgroundColor = Appearance.darkMauveColor
        
        self.layer.shadowColor = UIColor.black.cgColor
        self.layer.shadowOffset = CGSize(width: 0, height: 0)
        self.layer.shadowRadius = 2.0
        self.layer.shadowOpacity = 1.0
        self.layer.masksToBounds = false
        
        
    }
    
    // MARK - Properties
    
    @IBOutlet weak var largeInitialLabel: UILabel!
    @IBOutlet weak var teamNameLabel: UILabel!
    @IBOutlet weak var cellView: UIView!
    
}

@IBDesignable class PaddingLabel: UILabel {
    
    @IBInspectable var topInset: CGFloat = 5.0
    @IBInspectable var bottomInset: CGFloat = 5.0
    @IBInspectable var leftInset: CGFloat = 7.0
    @IBInspectable var rightInset: CGFloat = 7.0
    
    override func drawText(in rect: CGRect) {
        let insets = UIEdgeInsets.init(top: topInset, left: leftInset, bottom: bottomInset, right: rightInset)
        super.drawText(in: rect.inset(by: insets))
    }
    
    override var intrinsicContentSize: CGSize {
        let size = super.intrinsicContentSize
        return CGSize(width: size.width + leftInset + rightInset,
                      height: size.height + topInset + bottomInset)
    }
}
