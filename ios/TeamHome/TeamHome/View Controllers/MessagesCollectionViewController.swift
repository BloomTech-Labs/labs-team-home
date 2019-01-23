//
//  MessagesCollectionViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

class MessagesCollectionViewController: UICollectionViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard let apollo = apollo else { return }
        
        //Load messages with watcher 
        loadMessages(with: apollo)
    }

    // MARK: UICollectionViewDataSource

    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return messages?.count ?? 0
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "MessageCell", for: indexPath) as! MessageCollectionViewCell
        
        guard let message = messages?[indexPath.row] else { return UICollectionViewCell() }

        cell.message = message
    
        return cell
    }
    
    // MARK: - Navigation
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        //Pass message cell info to message detail VC
    }
    
    // MARK - Private Methods
    
    private func loadMessages(with apollo: ApolloClient) {
        
        let teamId = ""
        
        watcher = apollo.watch(query: FindMessagesByTeamQuery(teamId: teamId)) { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let messages = result?.data?.findMessagesByTeam else { return }
            self.messages = messages
        }
    }
    
    // MARK - Properties
    private var messages: [FindMessagesByTeamQuery.Data.FindMessagesByTeam?]? {
        didSet {
            if isViewLoaded {
                DispatchQueue.main.async {
                    self.collectionView.reloadData()
                }
            }
        }
    }
    
    var watcher: GraphQLQueryWatcher<FindMessagesByTeamQuery>?
    var apollo: ApolloClient?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
}
