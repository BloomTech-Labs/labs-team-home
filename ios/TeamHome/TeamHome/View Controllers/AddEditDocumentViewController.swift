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
import GrowingTextView

typealias Document = FindDocumentInputQuery.Data.FindDocument // FindDocumentsByTeamQuery.Data.FindDocumentsByTeam

class AddEditDocumentViewController: UIViewController, UICollectionViewDelegate, UICollectionViewDataSource, UITextFieldDelegate {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        collectionView.dataSource = self
        collectionView.delegate = self
        documentTitleTextField.delegate = self
        documentLinkTextField.delegate = self
        tagsTextField.delegate = self
        documentNotesTextView.keyboardAppearance = .dark

        documentNotesTextView.addDoneButtonOnKeyboard()
//        documentNotesTextView
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow(notification:)), name: UIResponder.keyboardWillShowNotification , object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide(notification:)), name: UIResponder.keyboardWillHideNotification , object: nil)
        
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
            let tag = processTagText(tag: tagsTextField.text)  else { return }
        
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
            self.tagButtonWasClicked = true
            DispatchQueue.main.async {
                self.tagsTextField.text = ""
                
                self.tagsTextField.resignFirstResponder()
            }
        }
    }
    @IBAction func addToFolder(_ sender: Any) {
        
    }
    // MARK: - UITextFieldDelegate
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        switch textField {
        case documentTitleTextField:
            _ = documentLinkTextField.becomeFirstResponder()
        case documentLinkTextField:
            _ = documentNotesTextView.becomeFirstResponder()
        default:
            textField.resignFirstResponder()
        }
        return true
    }

    // MARK: - UICollectionViewDataSource for tags
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return tags?.count ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "TagCell", for: indexPath) as! TagCollectionViewCell
        
        guard let tag = tags?[indexPath.row] else { return UICollectionViewCell() }
        cell.tagLabel.text = DocumentHelper.displayTagText(tag: tag.name)
        cell.backgroundColor = Appearance.darkMauveColor
        cell.layer.cornerRadius = cell.frame.height / 2
        
        if let document = self.document {
            
            if let documentTag = document.tag {
                let this = documentTag.name
                
                if tag.name == this {
                    self.tagSelected = documentTag.name
                    cell.backgroundColor = Appearance.mauveColor
                    self.tagCellSelected = cell
                }
            }
        }
        
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath:
        IndexPath) {
        
        guard let tag = tags?[indexPath.row] else { return }
        self.tagSelected = tag.name
        let cell = collectionView.cellForItem(at: indexPath) as! TagCollectionViewCell
        
        
        if cell == tagCellSelected {
        //user is unselecting a tag so remove selection
            cell.backgroundColor = Appearance.darkMauveColor
            tagCellSelected = nil
            tagSelected = nil
        } else {
        // user is selecting a new tag
            if tagCellSelected != nil {
                tagCellSelected?.backgroundColor = Appearance.darkMauveColor
            }
            cell.backgroundColor = Appearance.mauveColor
            tagCellSelected = cell
        }
        
        //
        //        cell?.backgroundColor = Appearance.mauveColor
    }
    
    // MARK: - Navigation
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "ChooseFolder" {
            let destVC = segue.destination as! FolderManagementViewController
            destVC.apollo = apollo
            destVC.team = team
            destVC.document = document
        }
    }
    
    //MARK: - Private Properties
    @objc private func keyboardWillShow(notification:NSNotification){
        guard let userInfo = notification.userInfo,
            let keyboardFrame = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect else {return}
        
        let contentInset = UIEdgeInsets(top: 0.0, left: 0.0, bottom: keyboardFrame.height, right: 0.0)
        scrollView.contentInset = contentInset
        scrollView.scrollIndicatorInsets = contentInset
        
        
    }
    @objc private func keyboardWillHide(notification:NSNotification){
        let contentInset = UIEdgeInsets(top: 0.0, left: 0.0, bottom: 0.0, right: 0.0)
        scrollView.contentInset = contentInset
        scrollView.scrollIndicatorInsets = contentInset
    }
    
    private func processTagText(tag: String?) -> String? {
        guard let tag = tag,
            let first = tag.first else {return nil}
        
        if first == "#"{
            return tag
        } else {
            return "#\(tag)"
        }
    }
    private func setupViews(){
        setUpViewAppearance()
//        hideKeyboardWhenTappedAround()
        newDocumentView.backgroundColor = Appearance.plumColor
        cancelButton.tintColor = Appearance.yellowColor
        submitButton.backgroundColor = Appearance.darkMauveColor
        
        documentLinkTextField.placeholderNormalColor = .white
        documentLinkTextField.textColor = .white
        documentLinkTextField.placeholder = "Add a link"
        documentLinkTextField.placeholderActiveColor = Appearance.yellowColor
        documentLinkTextField.dividerActiveColor = Appearance.yellowColor
        
        
        documentNotesTextView.textColor = .white
        documentNotesTextView.placeholder = "Add a note"
        
        documentTitleTextField.textColor = .white
        documentTitleTextField.placeholderNormalColor = .white
        documentTitleTextField.placeholderActiveColor = Appearance.yellowColor
        documentTitleTextField.dividerActiveColor = Appearance.yellowColor
        
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
            if self.tagButtonWasClicked{
                self.collectionView.scrollToBottom(animated: true)
                self.tagButtonWasClicked = false
            }
            
        }
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
    
    @objc func hideKeyboard() {
        view.endEditing(true)
    }
    
    func hideKeyboardWhenTappedAround() {
        let tapGesture = UITapGestureRecognizer(target: self,
                                                action: #selector(hideKeyboard))
        view.addGestureRecognizer(tapGesture)
    }
    //MARK: - Properties
    var apollo: ApolloClient!
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser!
    
    var document: Document?
    
    private var tagButtonWasClicked = false
    
    private var tagSelected: String?
    private var tagSelectedId: GraphQLID?
    private var tagCellSelected: TagCollectionViewCell?
    private var tags: [FindTagsByTeamQuery.Data.FindTagsByTeam?]?
    private var tagsWatcher: GraphQLQueryWatcher<FindTagsByTeamQuery>?
    private var firstResponder: UIView?
    
    @IBOutlet weak var scrollView: UIScrollView!
    @IBOutlet weak var folderButton: UIBarButtonItem!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var cancelButton: FlatButton!
    @IBOutlet weak var submitButton: RaisedButton!
    @IBOutlet weak var newDocumentView: UIView!
    @IBOutlet weak var documentTitleTextField: TextField!
    
    @IBOutlet weak var documentLinkTextField: TextField!
    @IBOutlet weak var documentNotesTextView: GrowingTextView!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var tagsTextField: TextField!
}
extension UITextView{
    
    @IBInspectable var doneAccessory: Bool{
        get{
            return self.doneAccessory
        }
        set (hasDone) {
            if hasDone{
                addDoneButtonOnKeyboard()
            }
        }
    }
    
    func addDoneButtonOnKeyboard()
    {
        let doneToolbar: UIToolbar = UIToolbar(frame: CGRect.init(x: 0, y: 0, width: UIScreen.main.bounds.width, height: 50))
        doneToolbar.barStyle = .black
//        doneToolbar.barTintColor = UIColor.darkGray
        
        let flexSpace = UIBarButtonItem(barButtonSystemItem: .flexibleSpace, target: nil, action: nil)
        let done: UIBarButtonItem = UIBarButtonItem(title: "Done", style: .done, target: self, action: #selector(self.doneButtonAction))
        
        let items = [flexSpace, done]
        doneToolbar.items = items
        doneToolbar.sizeToFit()
        
        self.inputAccessoryView = doneToolbar
    }
    
    @objc func doneButtonAction()
    {
        self.resignFirstResponder()
    }
}
