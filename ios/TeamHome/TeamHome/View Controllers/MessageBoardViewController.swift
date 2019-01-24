//
//  MessageBoardViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

class MessageBoardViewController: UIViewController, TabBarChildrenProtocol {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Show team name on label
        displayTeamInfo()

    }
    
    @IBAction func filterTags(_ sender: Any) {
        
        guard let apollo = apollo,
            let team = team,
            let teamId = team.id else { return }
        
        _ = apollo.watch(query: FindTagsByTeamQuery(teamId: teamId)) { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let result = result else { return }
            
            self.tags = result.data?.findTagsByTeam
            
            guard let tags = self.tags else { return }
            
            DispatchQueue.main.async {
                for tag in tags {
                    guard let tag = tag else { return }
                    let tagButton = UIButton()
                    tagButton.setTitle(tag.name, for: .normal)
                    self.filterTagsStackView.addSubview(tagButton)
                }
            }
        }
        
        
        
//        guard let tags = tags,
//            let tag = tags.first,
//            let tagId = tag?.id else { return }
//
//        //Displays stack view for tags
//
//        //Filters messages from selected tag
//        loadMessages(with: apollo)
//        filter(for: tagId)
    }
    
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        guard let apollo = apollo,
            let team = team else { return }
        
        // Pass Apollo Client and team info to Team Detail VC
        if segue.identifier == "ViewTeam" {
            guard let destinationVC = segue.destination as? TeamDetailTableViewController else { return }
            destinationVC.apollo = apollo
            destinationVC.team = team
        } else if segue.identifier == "EmbeddedMessages" {
            guard let destinationVC = segue.destination as? MessagesCollectionViewController else { return }
            destinationVC.apollo = apollo
            destinationVC.team = team
        } else if segue.identifier == "AddNewMessage" {
            guard let destinationVC = segue.destination as? AddNewMessageViewController else { return }
            destinationVC.apollo = apollo
            destinationVC.team = team
        }
    }
    
    // MARK - Private Methods
    
    private func displayTeamInfo() {
        guard let team = team else { return }
        
        teamNameLabel.text = team.name
        
    }
    
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
    
    private func filter(for selectedTagId: GraphQLID) {
        guard let messages = messages else { return }
        
        filteredMessages = []
        
        for message in messages {
            guard let tags = message?.tags else { return }
            for tag in tags {
                guard let tagId = tag?.id else { return }
                
                if tagId == selectedTagId {
                    filteredMessages?.append(message)
                    return
                }
            }
        }
    }
    
    // MARK - Properties
    
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var apollo: ApolloClient?
    private var messages: [FindMessagesByTeamQuery.Data.FindMessagesByTeam?]?
    private var filteredMessages: [FindMessagesByTeamQuery.Data.FindMessagesByTeam?]?
    private var tags: [FindTagsByTeamQuery.Data.FindTagsByTeam?]?
    
    @IBOutlet weak var teamNameLabel: UILabel!
    @IBOutlet weak var filterTagsStackView: UIStackView!
    
}
