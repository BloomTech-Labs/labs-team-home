//
//  ActivityTimelineViewController.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/11/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Auth0

class ActivityTimelineViewController: UIViewController, TabBarChildrenProtocol, UICollectionViewDataSource, UICollectionViewDelegate {
    
    // MARK - UICollectionViewDataSource
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 5
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "ActivityCell", for: indexPath) as! ActivityCollectionViewCell
        
        //        guard let user = users?[indexPath.row] else { return UICollectionViewCell() }
        //
        //        cell.firstNameLabel.text = user.firstName
        
        return cell
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        guard let team = team else { return }
        
        teamNameLabel.text = team.name
    }
    

    // MARK: - Navigation

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "ViewTeam" {
            guard let destinationVC = segue.destination as? TeamDetailTableViewController,
                let credentials = credentials,
                let team = team else { return }
            destinationVC.credentials = credentials
            destinationVC.team = team
        }
    }
    
    var team: AllTeamsQuery.Data.Team?
    var credentials: Credentials?
    
    @IBOutlet weak var teamNameLabel: UILabel!
    @IBOutlet weak var collectionView: UICollectionView!
    
}
