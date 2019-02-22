//
//  MessagesCollectionViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

var messagesWatcher: GraphQLQueryWatcher<FindMessagesByTeamQuery>?

class MessagesCollectionViewController: UICollectionViewController, UICollectionViewDelegateFlowLayout, MessageBoardFilterDelegate, MessageCellDelegate {
    
    func didClickFilter() {
        filter()
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        
        collectionView.backgroundColor = .clear
        
        guard let apollo = apollo else { return }
        
        //Load messages with watcher that can be called by other VCs
        loadMessages(with: apollo)
    }

    // MARK: UICollectionViewDataSource

    // Return the number of message from current team or return 0
    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return messages?.count ?? 0
    }

    // Set up cell with message information by passing message variable to collection view cell
    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "MessageCell", for: indexPath) as! MessageCollectionViewCell
        
        guard let message = messages?[indexPath.row],
            let currentUser = currentUser else { return UICollectionViewCell() }

        cell.message = message
        cell.currentUser = currentUser
        cell.delegate = self
        
//        let height = cell.card.frame.height
//        cell.frame = CGRect(x: cell.frame.origin.x, y: cell.frame.origin.y, width: cell.frame.width, height: height)
        
        return cell
    }
    
//    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
//        return CGSize(width: view.frame.width, height: 170)
//    }
    
    
    func presentActionSheet(with optionMenu: UIAlertController) {
        self.present(optionMenu, animated: true, completion: nil)
    }
    
    // MARK: - Navigation
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if segue.identifier == "ShowMessageDetail" {
            guard let destinationVC = segue.destination as? MessageDetailViewController,
            let indexPath = collectionView.indexPathsForSelectedItems?.first,
            let messages = messages,
            let messageId = messages[indexPath.row]?.id,
            let currentUser = currentUser,
            let team = team else { return }
            
            
                destinationVC.currentUser = currentUser
                destinationVC.team = team
                destinationVC.apollo = apollo
                destinationVC.messageId = messageId
        }
    }
    
    // MARK: - Private Methods
    
    // Load all messages from current team
    private func loadMessages(with apollo: ApolloClient) {
        
        guard let team = team,
            let teamId = team.id else { return }
        
        // Fetch messages using team's id
        messagesWatcher = apollo.watch(query: FindMessagesByTeamQuery(teamId: teamId)) { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let result = result,
                let messages = result.data?.findMessagesByTeam else { return }
            
            self.messages = messages
            self.sort()
        }
    }
    
    private func fetchCurrentUser(with apollo: ApolloClient) {
        apollo.fetch(query: CurrentUserQuery()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let result = result else { return }
            
            self.currentUser = result.data?.currentUser
        }
    }
    
    private func filter() {
        guard let messages = messages else { return }
        
        if newestToOldest {
            let sortedMessages = messages.sorted(by: { ($0?.createdAt)! < ($1?.createdAt)!})
            self.messages = sortedMessages
            newestToOldest = false
        } else {
            let sortedMessages = messages.sorted(by: { ($0?.createdAt)! > ($1?.createdAt)!})
            self.messages = sortedMessages
            newestToOldest = true
        }
    }
    
    private func sort() {
        guard let messages = messages else { return }

        let sortedMessages = messages.sorted(by: { ($0?.createdAt)! > ($1?.createdAt)!})
        self.messages = sortedMessages
        newestToOldest = true
    }
    
    // MARK: - Properties
    
    private var messages: [FindMessagesByTeamQuery.Data.FindMessagesByTeam?]? {
        didSet {
            if isViewLoaded {
                DispatchQueue.main.async {
                    self.collectionView.reloadData()
                }
            }
        }
    }
    
    var apollo: ApolloClient?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    var newestToOldest: Bool = true
}
