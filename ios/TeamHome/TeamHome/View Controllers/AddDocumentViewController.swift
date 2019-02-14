//
//  AddDocumentViewController.swift
//  TeamHome
//
//  Created by Andrew Dhan on 2/14/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Cloudinary
import Photos
import Material
import Motion


class AddDocumentViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        setUpViewAppearance()
        newDocumentView.backgroundColor = Appearance.plumColor
        cancelButton.tintColor = Appearance.yellowColor
        submitButton.backgroundColor = Appearance.darkMauveColor
        documentNotesTextView.placeholder = "Enter your message"
        documentNotesTextView.textColor = .white
        documentNotesTextView.dividerColor = Appearance.yellowColor
        documentTitleTextField.placeholderActiveColor = Appearance.yellowColor
        documentTitleTextField.dividerActiveColor = Appearance.yellowColor
        documentTitleTextField.textColor = .white
        tagsTextField.placeholderActiveColor = Appearance.yellowColor
        tagsTextField.dividerActiveColor = Appearance.yellowColor
        tagsTextField.textColor = .white
        tagsTextField.placeholderAnimation = .hidden
        titleLabel.font = Appearance.setTitleFont(with: .title2, pointSize: 20)
        collectionView.backgroundColor = .clear
    }
    

    //MARK: - Properties
    
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var cancelButton: FlatButton!
    @IBOutlet weak var submitButton: RaisedButton!
    @IBOutlet weak var newDocumentView: UIView!
    @IBOutlet weak var documentTitleTextField: TextField!
    
    @IBOutlet weak var documentLinkTextField: UITextField!
    @IBOutlet weak var documentNotesTextView: TextView!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var tagsTextField: TextField!
}
