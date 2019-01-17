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
        
        //Load messages with watcher 
        //loadMessages()
    }
    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        //Pass message cell info to message detail VC
    }

    // MARK: UICollectionViewDataSource

    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 5
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "MessageCell", for: indexPath) as! MessageCollectionViewCell
        
//        guard let user = users?[indexPath.row] else { return UICollectionViewCell() }
//
//        cell.firstNameLabel.text = user.firstName
    
        return cell
    }
    
    // MARK - Private Methods
    
    private func loadMessages() {
        watcher = apollo.watch(query: QueryNameQuery()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let users = result?.data?.users else { return }
            self.users = users
        }
    }
    
    // MARK - Properties
    var users: [QueryNameQuery.Data.User?]? {
        didSet {
            if isViewLoaded {
                DispatchQueue.main.async {
                    self.collectionView.reloadData()
                }
            }
        }
    }
    
    var watcher: GraphQLQueryWatcher<QueryNameQuery>?
}
