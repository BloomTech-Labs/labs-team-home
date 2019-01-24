//
//  ActivityTimelineViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Auth0
import Apollo

class ActivityTimelineViewController: UIViewController, TabBarChildrenProtocol, UICollectionViewDataSource, UICollectionViewDelegate {
    
    override func viewDidLoad() {
        super.viewDidLoad()

        guard let apollo = apollo,
            let team = team else { return }
        
        loadActivity(with: apollo, team: team)
    }
    
    // MARK - UICollectionViewDataSource
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return activity?.count ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "ActivityCell", for: indexPath) as! ActivityCollectionViewCell
        
        guard let activity = activity?[indexPath.row] else { return UICollectionViewCell() }
        
        cell.activity = activity
        
        return cell
    }

    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "ViewTeam" {
            guard let destinationVC = segue.destination as? TeamDetailTableViewController,
                let apollo = apollo,
                let team = team else { return }
            destinationVC.apollo = apollo
            destinationVC.team = team
        }
    }
    
    // MARK - Private Methods
    
    private func loadActivity(with apollo: ApolloClient, team: FindTeamsByUserQuery.Data.FindTeamsByUser) {
        
        teamNameLabel.text = team.name
        
        guard let teamId = team.id else { return }
        
        watcher = apollo.watch(query: FindActivityByTeamQuery(teamId: teamId), resultHandler: { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let activity = result?.data?.findMessagesByTeam else { return }
            
            self.activity = activity
        })
    }
    
    // MARK - Properties
    
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var apollo: ApolloClient?
    var watcher: GraphQLQueryWatcher<FindActivityByTeamQuery>?
    var activity: [FindActivityByTeamQuery.Data.FindMessagesByTeam?]? {
        didSet {
            DispatchQueue.main.async {
                self.collectionView.reloadData()
            }
        }
    }
    
    @IBOutlet weak var teamNameLabel: UILabel!
    @IBOutlet weak var collectionView: UICollectionView!
    
}
