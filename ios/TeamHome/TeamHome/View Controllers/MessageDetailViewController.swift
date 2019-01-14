//
//  MessageDetailViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Daniela Parra. All rights reserved.
//

import UIKit

class MessageDetailViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

    }
    

    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {

    }
    
    
    @IBOutlet weak var messageTitleLabel: UILabel!
    @IBOutlet weak var userAvatarImageView: UIImageView!
    @IBOutlet weak var firstNameLabel: UILabel!
    @IBOutlet weak var lastNameLabel: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var tagIconImageView: UIImageView!
    @IBOutlet weak var messageBodyLabel: UILabel!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var addRemoveImageButton: UIButton!
    @IBOutlet weak var tagsLabel: UILabel!
    @IBOutlet weak var addImageToCommentButton: UIButton!
    @IBOutlet weak var sendCommentButton: UIButton!
    @IBOutlet weak var subscribersLabel: UILabel!
    @IBOutlet weak var subscribersCollectionView: UICollectionView!
    
}
