# This activity timeline needs to be refactored:

## Why?

1. It doesn't actually show activity.
1. It shows the current state of the database in chronological order.
1. It does not show delete or edit activity, only update activity.
1. Even that activity is characterized as "new" such that "So and so posted a new message" even if that message is an edit.
1. You can not click on activity and see what it was, only that it happened and when.

**Because of all these things, the Activity Timeline fails to fulfill its own stated purpose and needs to be refactored**

## How?

### 1. Schema

We need to build a new database model in the back-end which should follow a schema similar to the following such that we can get all the right information for an event, which might look like a line of text displayed on the event timeline in place of the current activity components:

- " {Subject} {actioned} the {object} {team.name} on {date} at {time} "
- " Stephen joined the team 'Team Home 2' on Feb 10 at 10am "
- " Nedim edited a message comment on Feb 12 at 12am "
- " Kai deleted a folder on Feb 20 at 7pm "

Clicking on any event would open up a new modal that has all the details about the event.

If the event still exists, it can be viewed in its current state by opening an additional modal for the respective object (these modals have all already been built):

- Clicking more details on a `comment event` would open up the `document` or `message` modal it belongs to.
- Clicking more details on a `document event`, `message event`, or `folder event` would open its respective modal.
- Clicking more details on a `team event` probably wouldn't be allowed, as the modal is accessible at the top of the page as it is.

A potential schema might look like this:

```
Event
    {
        _id: _id, (non-nullable)
        team: _id (foreign key, non-nullable)
        time: dateTime (non-nullable)
        user: user._id (foreign key, nullable)
        action_string: type{"created", "edited", "deleted", "liked", "unliked", "joined", "left", "moved", "subscribed", "unsubscribed", "invited"}, (non-nullable)
        object_string: type{"message", "msgComment", "folder", "document", "docComment", "team", "user"}, (non-nullable)

        event_target_id: _id (nullable)
    }
```

### 2. Database CRUD Operations

Considering these are events, we would not need to use all crud operations as events can only happen, they can not be erased or edited. Consequently, we would only need:

#### Create:

`addEvent( event )` // Adds an event according to the object above

#### Read:

`events()` // returns an `[]` of all events (lol, never call this)

`findEvent( _id )` // returns an `{}` of all the event information given an event id

`findEventsByTeam( _id )` // returns an `[]` of all the events

#### Update:

None

#### Delete:

`deleteEventsByTeam( _id )`

### 3. GQL Resolvers

In the resolvers for every action on every other database resolver which is a mutation, a new mutation call must be added with the correct corresponding information to call `addEvent( { event object } )`

At first count this means adding **28** function calls of `addEvent()` in the pre-existing resolver structure:

- DocComments: 5
  Liked DONE
  Unlinked DONE
  Deleted DONE
  Added
  Updated
- Documents: 5
  deleted DONE
  added
  subscribed DONE
  unsubscribed DONE
  updated
- Folders: 3
  Deleted DONE
  Added DONE
  Updated
- Messages: 5
  deleted DONE
  added
  subscribed DONE
  unsubscribed DONE
  updated
- MsgComments: 5
  Liked DONE
  Unlinked DONE
  Deleted DONE
  Added
  Updated
- Team: 5
  Joined
  Left
  Updated

The good news is that no one will be able to have any gql mutation calls client side. And what is more, they will only have the ability to call gql queries--this will of course keep boilerplate minimal in this regard.

We will also absolutely need to look into pagination and implement it here.

### 4. Front End Components

There will need to be at least 3 front end components built.

1. ActivityTimeline Container
1. Event
1. EventDetails Modal

Unfortunately, the new nature of the database will mean obsoleting all the present components as the logic will need to be gutted. However, there will be a fair amount of salvageable styles and parts.

What is more, the new Modal is all but entirely built and styled. The additional modal calls already exist and are functioning.

### 5. Styling

All the styling decisions are done and would only need to be imported.

## Time Estimations

Database and back-end: 2-3 days for one person. 1-2 if two people.

Front-end: 2 days for 1 person. 1 day for two.

Total: 5 days for 1 person, 3 days for two.
