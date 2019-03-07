//
//  AddEditDocumentViewController.swift
//  TeamHome
//
//  Created by Andrew Dhan on 2/14/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Cloudinary
import Photos
import Material
import Motion

typealias Document = FindDocumentInputQuery.Data.FindDocument // FindDocumentsByTeamQuery.Data.FindDocumentsByTeam

class AddEditDocumentViewController: UIViewController, UICollectionViewDelegate, UICollectionViewDataSource {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        collectionView.dataSource = self
        collectionView.delegate = self
        setupViews()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        if let document = document {
            updateViewsForEdit(document: document)
        } else {
            updateViewsForAdd()
        }
        
        guard let apollo = apollo,
            let team = team,
            let teamId = team.id else { return }
        
        fetchAllTags(with: apollo, for: teamId)
    }
    
    //MARK: - IBActions
    @IBAction func submitDocument(_ sender: Any) {
        guard let title = documentTitleTextField.text,
            let link = documentLinkTextField.text
            //            ,
            //        let tagID = findSelectedTag()
            else { return}
        let note = documentNotesTextView.text ?? ""
        
        if let document = document {
            performEditMutation(document: document, title: title, doc_url: link, textContent: note, tagID: findSelectedTag())
        } else {
            performAddMutation(title: title, doc_url: link, team: team.id!, textContent: note, tagID:  findSelectedTag())
        }
        
        watcher?.refetch()
        navigationController?.popToRootViewController(animated: true)
        //        navigationController?.popViewController(animated: true)
        
    }
    @IBAction func cancelNewMessage(_ sender: Any) {
        
        navigationController?.popViewController(animated: true)
    }
    @IBAction func createTag(_ sender: Any) {
        guard let apollo = apollo,
            let team = team,
            let teamId = team.id,
            let tag = tagsTextField.text else { return }
        
        apollo.perform(mutation: CreateNewTagMutation(name: tag, teamId: teamId), queue: DispatchQueue.global()) { (result, error) in
            if let error = error {
                print("\(error)")
                return
            }
            
            guard let result = result,
                let data = result.data,
                let tag = data.addTag else { return }
            
            print(tag)
            
            self.tagsWatcher?.refetch()
            
            DispatchQueue.main.async {
                self.tagsTextField.text = ""
                
                // Show tag alert?
            }
        }
    }
    @IBAction func addToFolder(_ sender: Any) {
        
    }
    // MARK: - UICollectionViewDataSource for tags
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return tags?.count ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "TagCell", for: indexPath) as! TagCollectionViewCell
        
        guard let tag = tags?[indexPath.row] else { return UICollectionViewCell() }
        cell.tagLabel.text = tag.name
        cell.backgroundColor = Appearance.darkMauveColor
        cell.layer.cornerRadius = cell.frame.height / 2
        
        if let document = self.document {
            
            if let documentTag = document.tag {
                let this = documentTag.name
                
                if tag.name == this {
                    self.tagSelected = documentTag.name
                    cell.backgroundColor = Appearance.mauveColor
                }
            }
        }
        
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        guard let tag = tags?[indexPath.row] else { return }
        self.tagSelected = tag.name
        let cell = collectionView.cellForItem(at: indexPath)
        
        cell?.backgroundColor = Appearance.mauveColor
    }
    
    //MARK: - Private Properties
    private func setupViews(){
        setUpViewAppearance()
        newDocumentView.backgroundColor = Appearance.plumColor
        cancelButton.tintColor = Appearance.yellowColor
        submitButton.backgroundColor = Appearance.darkMauveColor
        
        documentLinkTextField.textColor = .white
        documentLinkTextField.placeholder = "Add a link"
        documentNotesTextView.textColor = .white
        documentNotesTextView.placeholder = "Add a note"
        
        documentNotesTextView.dividerColor = Appearance.yellowColor
        documentTitleTextField.textColor = .white
        
        tagsTextField.textColor = .white
        documentTitleTextField.placeholderAnimation = .hidden
        documentLinkTextField.placeholderAnimation = .hidden
        tagsTextField.placeholderAnimation = .hidden
        
        titleLabel.font = Appearance.setTitleFont(with: .title2, pointSize: 20)
        collectionView.backgroundColor = .clear
    }
    private func updateViewsForEdit(document: Document){
        titleLabel.text = "Edit Document"
        documentTitleTextField.text = document.title
        documentLinkTextField.text = document.docUrl
        documentNotesTextView.text = document.textContent
        
    }
    private func updateViewsForAdd(){
        titleLabel.text = "Add Document"
        documentTitleTextField.text = ""
        documentLinkTextField.text = ""
        documentNotesTextView.text = ""
    }
    
    private func performEditMutation(document: Document, title: String, doc_url: String, textContent: String, tagID: String?){
        if let tagID = tagID {
            apollo.perform(mutation: UpdateDocumentMutation(id: document.id!, title: title, doc_url: doc_url, textContent: textContent, tag: tagID))
            
        } else {
            apollo.perform(mutation: UpdateDocumentMutation(id: document.id!, title: title, doc_url: doc_url, textContent: textContent))
        }
    }
    
    private func performAddMutation(title: String, doc_url: String, team: String, textContent: String, tagID: String?){
        if let tagID = tagID {
            apollo.perform(mutation: AddNewDocumentMutation(title: title, doc_url: doc_url, team: team, textContent: textContent, tag: tagID))
        } else {
            apollo.perform(mutation: AddNewDocumentMutation(title: title, doc_url: doc_url, team: team, textContent: textContent))
        }
    }
    
    private func fetchAllTags(with apollo: ApolloClient, for teamId: GraphQLID) {
        // Find all tags by current team
        tagsWatcher = apollo.watch(query: FindTagsByTeamQuery(teamId: teamId)) { (result, error) in
            if let error = error {
                NSLog("\(error)")
                return
            }
            
            guard let result = result,
                let data = result.data,
                let tags = data.findTagsByTeam else { return }
            
            // Save tags and populate collection view
            print(tags)
            
            self.tags = tags
            self.collectionView.reloadData()
        }
    }
    private func createNewTag(with apollo: ApolloClient,under teamId: GraphQLID, for string: String) {
        apollo.perform(mutation: CreateNewTagMutation(name: string, teamId: teamId), queue: DispatchQueue.global(), resultHandler: { (result, error) in
            if let error = error {
                NSLog("\(error)")
            }
            
            guard let result = result,
                let newTagId = result.data?.addTag?.id else { return }
            
            print(newTagId)
            
        })
    }
    
    private func findSelectedTag() -> GraphQLID? {
        
        // Unwrap tag selection or recently created tag.
        guard let selectedTag = self.tagSelected,
            let tags = tags else {
                if let tagId = tagSelectedId {
                    return tagId
                }
                return nil
        }
        
        for tag in tags {
            if let tag = tag {
                if tag.name == selectedTag {
                    return tag.id
                }
            }
        }
        
        return nil
    }
    //MARK: - Properties
    var apollo: ApolloClient!
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser!
    
    var document: Document?
    
    private var tagSelected: String?
    private var tagSelectedId: GraphQLID?
    private var tags: [FindTagsByTeamQuery.Data.FindTagsByTeam?]?
    private var tagsWatcher: GraphQLQueryWatcher<FindTagsByTeamQuery>?
    
    @IBOutlet weak var folderButton: UIBarButtonItem!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var cancelButton: FlatButton!
    @IBOutlet weak var submitButton: RaisedButton!
    @IBOutlet weak var newDocumentView: UIView!
    @IBOutlet weak var documentTitleTextField: TextField!
    
    @IBOutlet weak var documentLinkTextField: TextField!
    @IBOutlet weak var documentNotesTextView: TextView!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var tagsTextField: TextField!
}
