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
}

class MessageBoardViewController: UIViewController, TabBarChildrenProtocol {
    
    // MARK - Lifecycle Methods

    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpViewAppearance()
        Appearance.styleOrange(button: filterButton)
        
        // Show team name on label
        displayTeamInfo()
    }
    
    // Generate all tag buttons for filtering messages
    @IBAction func filterTags(_ sender: Any) {

        delegate?.didClickFilter()
        
//        // Unwrap parameters to use
//        guard let apollo = apollo,
//            let team = team,
//            let teamId = team.id else { return }
//
//        // Fetch all tags used by current Team
//        _ = apollo.watch(query: FindTagsByTeamQuery(teamId: teamId)) { (result, error) in
//            if let error = error {
//                NSLog("\(error)")
//                return
//            }
//
//            guard let result = result,
//                let tags = result.data?.findTagsByTeam else { return }
//
//            // Set tags result to variable
//            self.tags = tags
//
//            // Create a button for each tag and add to stack view
//            DispatchQueue.main.async {
//                for tag in tags {
//                    guard let tag = tag else { return }
//                    let tagButton = UIButton()
//                    tagButton.setTitle(tag.name, for: .normal)
//                    self.filterTagsStackView.addSubview(tagButton)
//                }
//            }
//        }
    }
    
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        guard let apollo = apollo,
            let team = team else { return }
        
        // Pass Apollo Client and team info to Team Detail VC, Messages Container View and Add New Message VC
        if segue.identifier == "ViewTeam" {
            guard let destinationVC = segue.destination as? TeamDetailTableViewController else { return }
            destinationVC.apollo = apollo
            destinationVC.team = team
        } else if segue.identifier == "EmbeddedMessages" {
            guard let destinationVC = segue.destination as? MessagesCollectionViewController else { return }
            destinationVC.apollo = apollo
            destinationVC.team = team
            self.delegate = destinationVC
        } else if segue.identifier == "AddNewMessage" {
            guard let destinationVC = segue.destination as? AddNewMessageViewController else { return }
            destinationVC.apollo = apollo
            destinationVC.team = team
        }
    }
    
    // MARK - Private Methods
    
    // Display team name at the top of the view
    private func displayTeamInfo() {
        guard let team = team else { return }
        
        teamNameLabel.text = team.name
        
    }
    
    // Load all messages by current team
    private func loadMessages(with apollo: ApolloClient) {
        
        guard let team = team,
            let teamId = team.id else { return }
        
        messagesWatcher = apollo.watch(query: FindMessagesByTeamQuery(teamId: teamId)) { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let messages = result?.data?.findMessagesByTeam else { return }
            
            self.messages = messages
        }
    }
    
    // Filter messages based on selected tag from generated buttons
    private func filter(for selectedTagId: GraphQLID) {
        guard let messages = messages else { return }
        
//        filteredMessages = []
//
//        for message in messages {
//            guard let tags = message?.tags else { return }
//            for tag in tags {
//                guard let tagId = tag?.id else { return }
//
//                if tagId == selectedTagId {
//                    filteredMessages?.append(message)
//                    return
//                }
//            }
//        }
    }
    
    // MARK - Properties
    
    private var messages: [FindMessagesByTeamQuery.Data.FindMessagesByTeam?]?
    private var filteredMessages: [FindMessagesByTeamQuery.Data.FindMessagesByTeam?]?
    private var tags: [FindTagsByTeamQuery.Data.FindTagsByTeam?]?
    
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var apollo: ApolloClient?
    var delegate: MessageBoardFilterDelegate?
    
    @IBOutlet weak var teamNameLabel: UILabel!
    @IBOutlet weak var filterTagsStackView: UIStackView!
    @IBOutlet weak var filterButton: UIButton!
  
    private let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        
        formatter.timeStyle = .long
        formatter.dateStyle = .short
        
        return formatter
    }()
}
