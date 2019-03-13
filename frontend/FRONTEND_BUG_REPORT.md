### Bug and Glitch Reports

- Message + deleting comment does not reset counter for Reply -- what is Reply (number of users???) + reply count does not refresh -- Fixed by Bondor on Sat 3/9

- MsgComment + editing comment does not reflect the changes until refreshed - DONE + console log error [Cannot read property '_id' of null] - DONE

- DocComment + editing comment does not reflect the changes until refreshed - DONE

- Document + deleting document by going into folder, doc detail, delete does not update folder until refreshed - DONE + edit document did not reflect the changes on staging are just modal; until refreshed - DONE

- DnD + styling of preview need to improve + preview dissapears on safari

- Team Detail + inviting members broken; displays all info as null

- Activity Timeline + inviting member to team does not record the Event - says "There is an event here but it was not recorded properly" on screen -- Fixed by Bondor on Sat 3/9

- Settings + does not save when deselecting checkbox on "Receive Emails" -- Hmm... this is working for me Bondor 3/11

- Subscribe/Unsubscribe on documents does not maintain state -- click subscribe and then it show unsubscribe, but if you click out and back in, it is not updated. -- Fixed by Bondor on Sat 3/9

- When deleting a document that IS NOT in a folder, a refectQuery around line 430 on document details fails. --If the folder is Null, the refetch Folder fails. -- Bondor fixe don 3/11
