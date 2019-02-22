//
//  MessageBoardViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

protocol MessageBoardFilterDelegate: class {
    func didClickFilter()
    var newestToOldest: Bool { get set }
}

class MessageBoardViewController: UIViewController, TabBarChildrenProtocol {
    
    // MARK: - Lifecycle Methods

    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpViewAppearance()
        createGradientLayer()
        teamNameLabel.textColor = .white
        teamNameLabel.font = Appearance.setTitleFont(with: .title2, pointSize: 20)
        
        // Show team name on label
        displayTeamInfo()
        
        // Set this view controller as delegate for all cells.
        
    }
    
    // Filter messages by date.
    @IBAction func filterMessages(_ sender: Any) {
        guard let delegate = delegate else { return }
        
        // Call delegate to filter messages.
        delegate.didClickFilter()
        
        // Update button based on order of messages.
        if delegate.newestToOldest {
            let image = UIImage(named: "Arrow Down")!
            filterButton.setImage(image, for: .normal)
        } else {
            let image = UIImage(named: "Arrow Up")!
            filterButton.setImage(image, for: .normal)
        }
        
        
    }
    
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        guard let apollo = apollo,
            let team = team else { return }
        
        // Pass Apollo Client and team info to Team Detail VC, Messages Container View and Add New Message VC
        if segue.identifier == "EmbeddedMessages" {
            guard let destinationVC = segue.destination as? MessagesCollectionViewController,
                let currentUser = currentUser else { return }
            
            destinationVC.apollo = apollo
            destinationVC.team = team
            destinationVC.currentUser = currentUser
            self.delegate = destinationVC
        } else if segue.identifier == "AddMessage" {
            guard let destinationVC = segue.destination as? AddEditMessageViewController else { return }
            
            destinationVC.apollo = apollo
            destinationVC.team = team
        }
    }
    
    // MARK: - Private Methods
    
    // Display team name at the top of the view.
    private func displayTeamInfo() {
        guard let team = team else { return }
        
        teamNameLabel.text = team.name
    }
    
    // Create gradient layer for view background.
    private func createGradientLayer() {
        gradientLayer = CAGradientLayer()
        
        gradientLayer.frame = self.view.bounds
        
        gradientLayer.colors = [Appearance.grayColor.cgColor, Appearance.likeGrayColor.cgColor, Appearance.grayColor.cgColor]
        
        
        gradientLayer.locations = [0.0, 0.5]
        gradientLayer.startPoint = CGPoint(x: 0.0, y: 0.0)
        gradientLayer.endPoint = CGPoint(x: 1.0, y: 1.0)
        
        self.view.layer.insertSublayer(gradientLayer, at: 0)
    }
    
    // MARK: - Properties
    
    private var gradientLayer: CAGradientLayer!
    
    var apollo: ApolloClient?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var delegate: MessageBoardFilterDelegate?
    
    @IBOutlet weak var teamNameLabel: UILabel!
    @IBOutlet weak var filterButton: UIButton!
    @IBOutlet weak var containerView: UIView!
    
}
