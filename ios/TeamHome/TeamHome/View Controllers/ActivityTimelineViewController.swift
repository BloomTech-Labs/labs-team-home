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
        
        setUpViewAppearance()
        createGradientLayer()
        collectionView.backgroundColor = .clear
        teamNameLabel.textColor = Appearance.yellowColor
        
        loadActivity(with: apollo, team: team)
    }
    
    func createGradientLayer() {
        gradientLayer = CAGradientLayer()
        
        gradientLayer.frame = self.view.bounds
        
        gradientLayer.colors = [Appearance.grayColor.cgColor, Appearance.likeGrayColor.cgColor, Appearance.grayColor.cgColor]
        
        
        gradientLayer.locations = [0.0, 0.5]
        gradientLayer.startPoint = CGPoint(x: 0.0, y: 0.0)
        gradientLayer.endPoint = CGPoint(x: 1.0, y: 1.0)
        
        self.view.layer.insertSublayer(gradientLayer, at: 0)
    }
    
    // MARK - UICollectionViewDataSource
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return sortedActivity?.count ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "ActivityCell", for: indexPath) as! ActivityCollectionViewCell
        
        guard let activity = sortedActivity?[indexPath.row] else { return UICollectionViewCell() }

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
        
        _ = apollo.watch(query: FindActivityByTeamQuery(teamId: teamId), resultHandler: { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let messages = result?.data?.findMessagesByTeam else { return }
            
            self.messages = messages
            
            let group = DispatchGroup()
            
            for message in messages {
                group.enter()
                guard let messageId = message?.id else { return }
                _ = apollo.watch(query: FindCommentsByMessageQuery(messageId: messageId), resultHandler: { (result, error) in
                    if let error = error {
                        NSLog("\(error)")
                        return
                    }
                    
                    guard let result = result,
                        let comments = result.data?.findMsgCommentsByMessage else { return }
                    
                    self.comments = comments
                    group.leave()
                })
            }
            
            group.notify(queue: DispatchQueue.global(), execute: {
                self.mergeAllActivity()
            })
        })
    }
    
    private func mergeAllActivity() {
        
        guard let messages = messages,
            let comments = comments else { return }
        
        self.activityTimeline = []
        for message in messages {
            let activity = Activity(message: message, comment: nil, date: message?.createdAt)
            activityTimeline?.append(activity)
        }
        
        for comment in comments {
            let activity = Activity(message: nil, comment: comment, date: comment?.createdAt)
            activityTimeline?.append(activity)
        }
        
        guard let activityTimeline = activityTimeline else { return }
        
        let sortedActivity = activityTimeline.sorted(by: { $0.date! > $1.date!})
        self.sortedActivity = sortedActivity
    }
    
    // MARK - Properties
    
    
    private var messages: [FindActivityByTeamQuery.Data.FindMessagesByTeam?]?
    private var comments: [FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage?]?
    
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var apollo: ApolloClient?
    var gradientLayer: CAGradientLayer!
    private var activityTimeline: [Activity]?
    private var sortedActivity: [Activity]? {
        didSet {
            DispatchQueue.main.async {
                self.collectionView.reloadData()
            }
        }
    }
    
    @IBOutlet weak var teamNameLabel: UILabel!
    @IBOutlet weak var collectionView: UICollectionView!
    
}
