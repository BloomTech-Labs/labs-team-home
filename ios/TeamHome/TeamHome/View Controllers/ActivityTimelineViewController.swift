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

        setUpViewAppearance()
        createGradientLayer()
        collectionView.backgroundColor = .clear
        teamNameLabel.textColor = .white
        teamNameLabel.font = Appearance.setTitleFont(with: .title2, pointSize: 20)
        
        label = UILabel()
        label.text = "Loading activity"
        collectionView.addSubview(label)
    }
    override func viewWillAppear(_ animated: Bool) {
        
        guard let apollo = apollo,
            let team = team else { return }
        
        super.viewWillAppear(animated)
        loadActivity(with: apollo, team: team)
        fetchCurrentUser(with: apollo)
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
    
    // MARK: - UICollectionViewDataSource
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return sortedActivity?.count ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "ActivityCell", for: indexPath) as! ActivityCollectionViewCell
        
        guard let activity = sortedActivity?[indexPath.row],
            let currentUser = currentUser else { return UICollectionViewCell() }

        cell.activity = activity
        cell.currentUser = currentUser
        
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
    
    // MARK: - Private Methods
    
    private func loadActivity(with apollo: ApolloClient, team: FindTeamsByUserQuery.Data.FindTeamsByUser) {
        
        teamNameLabel.text = team.name
        
        guard let teamId = team.id else { return }
        
        _ = apollo.watch(query: FindActivityByTeamQuery(teamId: teamId), resultHandler: { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let messages = result?.data?.findMessagesByTeam else { return }
            
            self.messages = messages.reversed()
            
            self.activityTimeline = []
            //creates activity from messages and adds to activity timeline
            for message in messages.reversed() {
                let activity = Activity(message: message, comment: nil, document: nil, date: message?.createdAt)
                self.activityTimeline?.append(activity)
            }

            //fetches the comments associated with each message
            let dispatchGroup = DispatchGroup()
            
            for message in messages.reversed() {
                dispatchGroup.enter()
                guard let messageId = message?.id else { return }
                _ = apollo.watch(query: FindCommentsByMessageQuery(messageId: messageId), resultHandler: { (result, error) in
                    if let error = error {
                        NSLog("\(error)")
                        return
                    }
                    
                    guard let result = result,
                        let comments = result.data?.findMsgCommentsByMessage else { return }
                    self.appendMessageActivity(with: comments)
                    dispatchGroup.leave()
                })
            }
            
            dispatchGroup.enter()
            self.appendDocumentActivity(with: apollo, teamID: teamId,dispatchGroup: dispatchGroup)
            dispatchGroup.notify(queue: .global()){
                self.sortActivity()
            }
        })
//        appendDocumentActivity(with: apollo, teamID: teamId)
    }
    
    private func fetchCurrentUser(with apollo: ApolloClient) {
        apollo.fetch(query: CurrentUserQuery(), queue: DispatchQueue.global()) { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let result = result,
                let data = result.data,
                let user = data.currentUser else { return }
            
            self.currentUser = user
        }
    }
    
    //fetch documents and append as activity to activity timeline
    private func appendDocumentActivity(with apollo: ApolloClient, teamID: GraphQLID, dispatchGroup:DispatchGroup?){
        _ = apollo.fetch(query: FindDocumentsByTeamQuery(teamID: teamID), resultHandler: { (result, error) in
            if let error = error {
                NSLog("Error fetching document activity: \(error)")
                return
            }
            guard let documents = result?.data?.findDocumentsByTeam else {return}
            for document in documents{
                let activity = Activity(message: nil, comment: nil, document: document, date: document?.createdAt)
                self.activityTimeline?.append(activity)
                //TODO: Add comments to documents in document activity
            }
            if let dispatchGroup = dispatchGroup{
                dispatchGroup.leave()
            }
        })
    }
    private func appendMessageActivity(with comments: [FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage?]) {
        
        for comment in comments {
            let activity = Activity(message: nil, comment: comment, document: nil, date: comment?.createdAt)
            activityTimeline?.append(activity)
        }
        sortActivity()

    }
    
    private func sortActivity(){
        guard let activityTimeline = activityTimeline else { return }
        
        let sortedActivity = activityTimeline.sorted(by: { $0.date! > $1.date!})
        self.sortedActivity = sortedActivity
    }
    
    // MARK: - Properties
    private var label: UILabel!
    
    private var messages: [FindActivityByTeamQuery.Data.FindMessagesByTeam?]?
    private var comments: [FindCommentsByMessageQuery.Data.FindMsgCommentsByMessage?] = []
    private var activityTimeline: [Activity]?
    private var sortedActivity: [Activity]? {
        didSet {
            DispatchQueue.main.async {
                self.collectionView.reloadData()
            }
        }
    }
    
    var apollo: ApolloClient?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    var gradientLayer: CAGradientLayer!
    
    @IBOutlet weak var teamNameLabel: UILabel!
    @IBOutlet weak var collectionView: UICollectionView!
    
}
