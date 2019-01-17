//
//  DashboardCollectionViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/16/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

class DashboardCollectionViewController: UICollectionViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        loadTeams()
    }


    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using [segue destinationViewController].
        // Pass the selected object to the new view controller.
    }


    // MARK: UICollectionViewDataSource


    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return tags?.count ?? 0
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "TeamCell", for: indexPath) as! TeamCollectionViewCell
    
        guard let team = tags?[indexPath.row] else { return UICollectionViewCell()}
        cell.teamNameLabel.text = team.name
    
        return cell
    }
    
    // MARK - Private Methods
    
    private func loadTeams() {
//        watcher = apollo.watch(query: AllTagsQuery()) { (result, error) in
//            if let error = error {
//                NSLog("\(error)")
//            }
//            
//            guard let tags = result?.data?.tags else { return }
//            self.tags = tags
//        }
    }

    // MARK - Properties
    
    var tags: [AllTagsQuery.Data.Tag?]? {
        didSet {
            if isViewLoaded {
                DispatchQueue.main.async {
                    self.collectionView.reloadData()
                }
            }
        }
    }
    
    var watcher: GraphQLQueryWatcher<AllTagsQuery>?
}
