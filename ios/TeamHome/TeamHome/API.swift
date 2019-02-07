//  This file was automatically generated and should not be edited.

import Apollo

public struct TeamUserInput: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(user: Swift.Optional<String?> = nil, admin: Swift.Optional<Bool?> = nil) {
    graphQLMap = ["user": user, "admin": admin]
  }

  public var user: Swift.Optional<String?> {
    get {
      return graphQLMap["user"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "user")
    }
  }

  public var admin: Swift.Optional<Bool?> {
    get {
      return graphQLMap["admin"] as! Swift.Optional<Bool?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "admin")
    }
  }
}

public final class FindMessageByIdQuery: GraphQLQuery {
  public let operationDefinition =
    "query FindMessageById($id: ID!) {\n  findMessage(input: {id: $id}) {\n    __typename\n    _id\n    title\n    user {\n      __typename\n      firstName\n      lastName\n      avatar\n    }\n    team {\n      __typename\n      name\n      _id\n    }\n    content\n    images\n    tag {\n      __typename\n      name\n      _id\n    }\n    comments\n    subscribedUsers {\n      __typename\n      firstName\n      lastName\n      avatar\n      _id\n    }\n    createdAt\n    updatedAt\n  }\n}"

  public var id: GraphQLID

  public init(id: GraphQLID) {
    self.id = id
  }

  public var variables: GraphQLMap? {
    return ["id": id]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("findMessage", arguments: ["input": ["id": GraphQLVariable("id")]], type: .object(FindMessage.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(findMessage: FindMessage? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "findMessage": findMessage.flatMap { (value: FindMessage) -> ResultMap in value.resultMap }])
    }

    public var findMessage: FindMessage? {
      get {
        return (resultMap["findMessage"] as? ResultMap).flatMap { FindMessage(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "findMessage")
      }
    }

    public struct FindMessage: GraphQLSelectionSet {
      public static let possibleTypes = ["Message"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
        GraphQLField("title", type: .nonNull(.scalar(String.self))),
        GraphQLField("user", type: .nonNull(.object(User.selections))),
        GraphQLField("team", type: .nonNull(.object(Team.selections))),
        GraphQLField("content", type: .nonNull(.scalar(String.self))),
        GraphQLField("images", type: .list(.scalar(String.self))),
        GraphQLField("tag", type: .object(Tag.selections)),
        GraphQLField("comments", type: .list(.scalar(GraphQLID.self))),
        GraphQLField("subscribedUsers", type: .list(.object(SubscribedUser.selections))),
        GraphQLField("createdAt", type: .scalar(String.self)),
        GraphQLField("updatedAt", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil, title: String, user: User, team: Team, content: String, images: [String?]? = nil, tag: Tag? = nil, comments: [GraphQLID?]? = nil, subscribedUsers: [SubscribedUser?]? = nil, createdAt: String? = nil, updatedAt: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "Message", "_id": id, "title": title, "user": user.resultMap, "team": team.resultMap, "content": content, "images": images, "tag": tag.flatMap { (value: Tag) -> ResultMap in value.resultMap }, "comments": comments, "subscribedUsers": subscribedUsers.flatMap { (value: [SubscribedUser?]) -> [ResultMap?] in value.map { (value: SubscribedUser?) -> ResultMap? in value.flatMap { (value: SubscribedUser) -> ResultMap in value.resultMap } } }, "createdAt": createdAt, "updatedAt": updatedAt])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }

      public var title: String {
        get {
          return resultMap["title"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "title")
        }
      }

      public var user: User {
        get {
          return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "user")
        }
      }

      public var team: Team {
        get {
          return Team(unsafeResultMap: resultMap["team"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "team")
        }
      }

      public var content: String {
        get {
          return resultMap["content"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "content")
        }
      }

      public var images: [String?]? {
        get {
          return resultMap["images"] as? [String?]
        }
        set {
          resultMap.updateValue(newValue, forKey: "images")
        }
      }

      public var tag: Tag? {
        get {
          return (resultMap["tag"] as? ResultMap).flatMap { Tag(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "tag")
        }
      }

      public var comments: [GraphQLID?]? {
        get {
          return resultMap["comments"] as? [GraphQLID?]
        }
        set {
          resultMap.updateValue(newValue, forKey: "comments")
        }
      }

      public var subscribedUsers: [SubscribedUser?]? {
        get {
          return (resultMap["subscribedUsers"] as? [ResultMap?]).flatMap { (value: [ResultMap?]) -> [SubscribedUser?] in value.map { (value: ResultMap?) -> SubscribedUser? in value.flatMap { (value: ResultMap) -> SubscribedUser in SubscribedUser(unsafeResultMap: value) } } }
        }
        set {
          resultMap.updateValue(newValue.flatMap { (value: [SubscribedUser?]) -> [ResultMap?] in value.map { (value: SubscribedUser?) -> ResultMap? in value.flatMap { (value: SubscribedUser) -> ResultMap in value.resultMap } } }, forKey: "subscribedUsers")
        }
      }

      public var createdAt: String? {
        get {
          return resultMap["createdAt"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "createdAt")
        }
      }

      public var updatedAt: String? {
        get {
          return resultMap["updatedAt"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "updatedAt")
        }
      }

      public struct User: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("firstName", type: .nonNull(.scalar(String.self))),
          GraphQLField("lastName", type: .nonNull(.scalar(String.self))),
          GraphQLField("avatar", type: .scalar(String.self)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(firstName: String, lastName: String, avatar: String? = nil) {
          self.init(unsafeResultMap: ["__typename": "User", "firstName": firstName, "lastName": lastName, "avatar": avatar])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var firstName: String {
          get {
            return resultMap["firstName"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "firstName")
          }
        }

        public var lastName: String {
          get {
            return resultMap["lastName"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "lastName")
          }
        }

        public var avatar: String? {
          get {
            return resultMap["avatar"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "avatar")
          }
        }
      }

      public struct Team: GraphQLSelectionSet {
        public static let possibleTypes = ["Team"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("name", type: .nonNull(.scalar(String.self))),
          GraphQLField("_id", type: .scalar(GraphQLID.self)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(name: String, id: GraphQLID? = nil) {
          self.init(unsafeResultMap: ["__typename": "Team", "name": name, "_id": id])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var name: String {
          get {
            return resultMap["name"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "name")
          }
        }

        public var id: GraphQLID? {
          get {
            return resultMap["_id"] as? GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "_id")
          }
        }
      }

      public struct Tag: GraphQLSelectionSet {
        public static let possibleTypes = ["Tag"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("name", type: .nonNull(.scalar(String.self))),
          GraphQLField("_id", type: .scalar(GraphQLID.self)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(name: String, id: GraphQLID? = nil) {
          self.init(unsafeResultMap: ["__typename": "Tag", "name": name, "_id": id])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var name: String {
          get {
            return resultMap["name"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "name")
          }
        }

        public var id: GraphQLID? {
          get {
            return resultMap["_id"] as? GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "_id")
          }
        }
      }

      public struct SubscribedUser: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("firstName", type: .nonNull(.scalar(String.self))),
          GraphQLField("lastName", type: .nonNull(.scalar(String.self))),
          GraphQLField("avatar", type: .scalar(String.self)),
          GraphQLField("_id", type: .nonNull(.scalar(GraphQLID.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(firstName: String, lastName: String, avatar: String? = nil, id: GraphQLID) {
          self.init(unsafeResultMap: ["__typename": "User", "firstName": firstName, "lastName": lastName, "avatar": avatar, "_id": id])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var firstName: String {
          get {
            return resultMap["firstName"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "firstName")
          }
        }

        public var lastName: String {
          get {
            return resultMap["lastName"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "lastName")
          }
        }

        public var avatar: String? {
          get {
            return resultMap["avatar"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "avatar")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["_id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "_id")
          }
        }
      }
    }
  }
}

public final class CreateImageCommentMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation CreateImageComment($message: String!, $content: String!, $image: String) {\n  addMsgComment(input: {message: $message, content: $content, image: $image}) {\n    __typename\n    _id\n  }\n}"

  public var message: String
  public var content: String
  public var image: String?

  public init(message: String, content: String, image: String? = nil) {
    self.message = message
    self.content = content
    self.image = image
  }

  public var variables: GraphQLMap? {
    return ["message": message, "content": content, "image": image]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("addMsgComment", arguments: ["input": ["message": GraphQLVariable("message"), "content": GraphQLVariable("content"), "image": GraphQLVariable("image")]], type: .object(AddMsgComment.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(addMsgComment: AddMsgComment? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "addMsgComment": addMsgComment.flatMap { (value: AddMsgComment) -> ResultMap in value.resultMap }])
    }

    public var addMsgComment: AddMsgComment? {
      get {
        return (resultMap["addMsgComment"] as? ResultMap).flatMap { AddMsgComment(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "addMsgComment")
      }
    }

    public struct AddMsgComment: GraphQLSelectionSet {
      public static let possibleTypes = ["MsgComment"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil) {
        self.init(unsafeResultMap: ["__typename": "MsgComment", "_id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }
    }
  }
}

public final class CreateCommentMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation CreateComment($message: String!, $content: String!) {\n  addMsgComment(input: {message: $message, content: $content}) {\n    __typename\n    _id\n  }\n}"

  public var message: String
  public var content: String

  public init(message: String, content: String) {
    self.message = message
    self.content = content
  }

  public var variables: GraphQLMap? {
    return ["message": message, "content": content]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("addMsgComment", arguments: ["input": ["message": GraphQLVariable("message"), "content": GraphQLVariable("content")]], type: .object(AddMsgComment.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(addMsgComment: AddMsgComment? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "addMsgComment": addMsgComment.flatMap { (value: AddMsgComment) -> ResultMap in value.resultMap }])
    }

    public var addMsgComment: AddMsgComment? {
      get {
        return (resultMap["addMsgComment"] as? ResultMap).flatMap { AddMsgComment(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "addMsgComment")
      }
    }

    public struct AddMsgComment: GraphQLSelectionSet {
      public static let possibleTypes = ["MsgComment"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil) {
        self.init(unsafeResultMap: ["__typename": "MsgComment", "_id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }
    }
  }
}

public final class SubscribeMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation Subscribe($id: ID!) {\n  subscribe(input: {id: $id}) {\n    __typename\n    _id\n  }\n}"

  public var id: GraphQLID

  public init(id: GraphQLID) {
    self.id = id
  }

  public var variables: GraphQLMap? {
    return ["id": id]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("subscribe", arguments: ["input": ["id": GraphQLVariable("id")]], type: .object(Subscribe.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(subscribe: Subscribe? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "subscribe": subscribe.flatMap { (value: Subscribe) -> ResultMap in value.resultMap }])
    }

    public var subscribe: Subscribe? {
      get {
        return (resultMap["subscribe"] as? ResultMap).flatMap { Subscribe(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "subscribe")
      }
    }

    public struct Subscribe: GraphQLSelectionSet {
      public static let possibleTypes = ["Message"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil) {
        self.init(unsafeResultMap: ["__typename": "Message", "_id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }
    }
  }
}

public final class UnsubscribeMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation Unsubscribe($id: ID!) {\n  unsubscribe(input: {id: $id}) {\n    __typename\n    _id\n  }\n}"

  public var id: GraphQLID

  public init(id: GraphQLID) {
    self.id = id
  }

  public var variables: GraphQLMap? {
    return ["id": id]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("unsubscribe", arguments: ["input": ["id": GraphQLVariable("id")]], type: .object(Unsubscribe.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(unsubscribe: Unsubscribe? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "unsubscribe": unsubscribe.flatMap { (value: Unsubscribe) -> ResultMap in value.resultMap }])
    }

    public var unsubscribe: Unsubscribe? {
      get {
        return (resultMap["unsubscribe"] as? ResultMap).flatMap { Unsubscribe(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "unsubscribe")
      }
    }

    public struct Unsubscribe: GraphQLSelectionSet {
      public static let possibleTypes = ["Message"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil) {
        self.init(unsafeResultMap: ["__typename": "Message", "_id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }
    }
  }
}

public final class CreateNewUserMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation CreateNewUser($firstName: String!, $lastName: String!, $email: String!, $avatar: String) {\n  addUser(input: {firstName: $firstName, lastName: $lastName, email: $email, avatar: $avatar}) {\n    __typename\n    _id\n  }\n}"

  public var firstName: String
  public var lastName: String
  public var email: String
  public var avatar: String?

  public init(firstName: String, lastName: String, email: String, avatar: String? = nil) {
    self.firstName = firstName
    self.lastName = lastName
    self.email = email
    self.avatar = avatar
  }

  public var variables: GraphQLMap? {
    return ["firstName": firstName, "lastName": lastName, "email": email, "avatar": avatar]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("addUser", arguments: ["input": ["firstName": GraphQLVariable("firstName"), "lastName": GraphQLVariable("lastName"), "email": GraphQLVariable("email"), "avatar": GraphQLVariable("avatar")]], type: .object(AddUser.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(addUser: AddUser? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "addUser": addUser.flatMap { (value: AddUser) -> ResultMap in value.resultMap }])
    }

    public var addUser: AddUser? {
      get {
        return (resultMap["addUser"] as? ResultMap).flatMap { AddUser(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "addUser")
      }
    }

    public struct AddUser: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .nonNull(.scalar(GraphQLID.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID) {
        self.init(unsafeResultMap: ["__typename": "User", "_id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["_id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }
    }
  }
}

public final class FindTeamByIdQuery: GraphQLQuery {
  public let operationDefinition =
    "query FindTeamById($id: ID!) {\n  findTeam(input: {id: $id}) {\n    __typename\n    _id\n    name\n    users {\n      __typename\n      user {\n        __typename\n        _id\n        firstName\n        lastName\n        email\n        phoneNumber\n        avatar\n      }\n      admin\n    }\n  }\n}"

  public var id: GraphQLID

  public init(id: GraphQLID) {
    self.id = id
  }

  public var variables: GraphQLMap? {
    return ["id": id]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("findTeam", arguments: ["input": ["id": GraphQLVariable("id")]], type: .object(FindTeam.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(findTeam: FindTeam? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "findTeam": findTeam.flatMap { (value: FindTeam) -> ResultMap in value.resultMap }])
    }

    public var findTeam: FindTeam? {
      get {
        return (resultMap["findTeam"] as? ResultMap).flatMap { FindTeam(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "findTeam")
      }
    }

    public struct FindTeam: GraphQLSelectionSet {
      public static let possibleTypes = ["Team"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
        GraphQLField("name", type: .nonNull(.scalar(String.self))),
        GraphQLField("users", type: .list(.object(User.selections))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil, name: String, users: [User?]? = nil) {
        self.init(unsafeResultMap: ["__typename": "Team", "_id": id, "name": name, "users": users.flatMap { (value: [User?]) -> [ResultMap?] in value.map { (value: User?) -> ResultMap? in value.flatMap { (value: User) -> ResultMap in value.resultMap } } }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }

      public var name: String {
        get {
          return resultMap["name"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "name")
        }
      }

      public var users: [User?]? {
        get {
          return (resultMap["users"] as? [ResultMap?]).flatMap { (value: [ResultMap?]) -> [User?] in value.map { (value: ResultMap?) -> User? in value.flatMap { (value: ResultMap) -> User in User(unsafeResultMap: value) } } }
        }
        set {
          resultMap.updateValue(newValue.flatMap { (value: [User?]) -> [ResultMap?] in value.map { (value: User?) -> ResultMap? in value.flatMap { (value: User) -> ResultMap in value.resultMap } } }, forKey: "users")
        }
      }

      public struct User: GraphQLSelectionSet {
        public static let possibleTypes = ["TeamUser"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("user", type: .nonNull(.object(User.selections))),
          GraphQLField("admin", type: .nonNull(.scalar(Bool.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(user: User, admin: Bool) {
          self.init(unsafeResultMap: ["__typename": "TeamUser", "user": user.resultMap, "admin": admin])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var user: User {
          get {
            return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "user")
          }
        }

        public var admin: Bool {
          get {
            return resultMap["admin"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "admin")
          }
        }

        public struct User: GraphQLSelectionSet {
          public static let possibleTypes = ["User"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("_id", type: .nonNull(.scalar(GraphQLID.self))),
            GraphQLField("firstName", type: .nonNull(.scalar(String.self))),
            GraphQLField("lastName", type: .nonNull(.scalar(String.self))),
            GraphQLField("email", type: .nonNull(.scalar(String.self))),
            GraphQLField("phoneNumber", type: .scalar(String.self)),
            GraphQLField("avatar", type: .scalar(String.self)),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(id: GraphQLID, firstName: String, lastName: String, email: String, phoneNumber: String? = nil, avatar: String? = nil) {
            self.init(unsafeResultMap: ["__typename": "User", "_id": id, "firstName": firstName, "lastName": lastName, "email": email, "phoneNumber": phoneNumber, "avatar": avatar])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var id: GraphQLID {
            get {
              return resultMap["_id"]! as! GraphQLID
            }
            set {
              resultMap.updateValue(newValue, forKey: "_id")
            }
          }

          public var firstName: String {
            get {
              return resultMap["firstName"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "firstName")
            }
          }

          public var lastName: String {
            get {
              return resultMap["lastName"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "lastName")
            }
          }

          public var email: String {
            get {
              return resultMap["email"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "email")
            }
          }

          public var phoneNumber: String? {
            get {
              return resultMap["phoneNumber"] as? String
            }
            set {
              resultMap.updateValue(newValue, forKey: "phoneNumber")
            }
          }

          public var avatar: String? {
            get {
              return resultMap["avatar"] as? String
            }
            set {
              resultMap.updateValue(newValue, forKey: "avatar")
            }
          }
        }
      }
    }
  }
}

public final class CurrentUserQuery: GraphQLQuery {
  public let operationDefinition =
    "query CurrentUser {\n  currentUser {\n    __typename\n    _id\n    authId\n    firstName\n    lastName\n    email\n    phoneNumber\n    avatar\n    toggles {\n      __typename\n      receiveEmails\n      receiveTexts\n    }\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("currentUser", type: .object(CurrentUser.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(currentUser: CurrentUser? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "currentUser": currentUser.flatMap { (value: CurrentUser) -> ResultMap in value.resultMap }])
    }

    public var currentUser: CurrentUser? {
      get {
        return (resultMap["currentUser"] as? ResultMap).flatMap { CurrentUser(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "currentUser")
      }
    }

    public struct CurrentUser: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("authId", type: .nonNull(.scalar(String.self))),
        GraphQLField("firstName", type: .nonNull(.scalar(String.self))),
        GraphQLField("lastName", type: .nonNull(.scalar(String.self))),
        GraphQLField("email", type: .nonNull(.scalar(String.self))),
        GraphQLField("phoneNumber", type: .scalar(String.self)),
        GraphQLField("avatar", type: .scalar(String.self)),
        GraphQLField("toggles", type: .object(Toggle.selections)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, authId: String, firstName: String, lastName: String, email: String, phoneNumber: String? = nil, avatar: String? = nil, toggles: Toggle? = nil) {
        self.init(unsafeResultMap: ["__typename": "User", "_id": id, "authId": authId, "firstName": firstName, "lastName": lastName, "email": email, "phoneNumber": phoneNumber, "avatar": avatar, "toggles": toggles.flatMap { (value: Toggle) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["_id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }

      public var authId: String {
        get {
          return resultMap["authId"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "authId")
        }
      }

      public var firstName: String {
        get {
          return resultMap["firstName"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "firstName")
        }
      }

      public var lastName: String {
        get {
          return resultMap["lastName"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "lastName")
        }
      }

      public var email: String {
        get {
          return resultMap["email"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "email")
        }
      }

      public var phoneNumber: String? {
        get {
          return resultMap["phoneNumber"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "phoneNumber")
        }
      }

      public var avatar: String? {
        get {
          return resultMap["avatar"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "avatar")
        }
      }

      public var toggles: Toggle? {
        get {
          return (resultMap["toggles"] as? ResultMap).flatMap { Toggle(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "toggles")
        }
      }

      public struct Toggle: GraphQLSelectionSet {
        public static let possibleTypes = ["Toggles"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("receiveEmails", type: .nonNull(.scalar(Bool.self))),
          GraphQLField("receiveTexts", type: .nonNull(.scalar(Bool.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(receiveEmails: Bool, receiveTexts: Bool) {
          self.init(unsafeResultMap: ["__typename": "Toggles", "receiveEmails": receiveEmails, "receiveTexts": receiveTexts])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var receiveEmails: Bool {
          get {
            return resultMap["receiveEmails"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "receiveEmails")
          }
        }

        public var receiveTexts: Bool {
          get {
            return resultMap["receiveTexts"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "receiveTexts")
          }
        }
      }
    }
  }
}

public final class FindMessagesByTeamQuery: GraphQLQuery {
  public let operationDefinition =
    "query FindMessagesByTeam($teamId: ID!) {\n  findMessagesByTeam(input: {team: $teamId}) {\n    __typename\n    _id\n    title\n    user {\n      __typename\n      firstName\n      lastName\n      avatar\n      _id\n    }\n    content\n    images\n    tag {\n      __typename\n      name\n      _id\n    }\n    comments\n    subscribedUsers {\n      __typename\n      firstName\n      lastName\n      avatar\n    }\n    createdAt\n    updatedAt\n  }\n}"

  public var teamId: GraphQLID

  public init(teamId: GraphQLID) {
    self.teamId = teamId
  }

  public var variables: GraphQLMap? {
    return ["teamId": teamId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("findMessagesByTeam", arguments: ["input": ["team": GraphQLVariable("teamId")]], type: .list(.object(FindMessagesByTeam.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(findMessagesByTeam: [FindMessagesByTeam?]? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "findMessagesByTeam": findMessagesByTeam.flatMap { (value: [FindMessagesByTeam?]) -> [ResultMap?] in value.map { (value: FindMessagesByTeam?) -> ResultMap? in value.flatMap { (value: FindMessagesByTeam) -> ResultMap in value.resultMap } } }])
    }

    public var findMessagesByTeam: [FindMessagesByTeam?]? {
      get {
        return (resultMap["findMessagesByTeam"] as? [ResultMap?]).flatMap { (value: [ResultMap?]) -> [FindMessagesByTeam?] in value.map { (value: ResultMap?) -> FindMessagesByTeam? in value.flatMap { (value: ResultMap) -> FindMessagesByTeam in FindMessagesByTeam(unsafeResultMap: value) } } }
      }
      set {
        resultMap.updateValue(newValue.flatMap { (value: [FindMessagesByTeam?]) -> [ResultMap?] in value.map { (value: FindMessagesByTeam?) -> ResultMap? in value.flatMap { (value: FindMessagesByTeam) -> ResultMap in value.resultMap } } }, forKey: "findMessagesByTeam")
      }
    }

    public struct FindMessagesByTeam: GraphQLSelectionSet {
      public static let possibleTypes = ["Message"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
        GraphQLField("title", type: .nonNull(.scalar(String.self))),
        GraphQLField("user", type: .nonNull(.object(User.selections))),
        GraphQLField("content", type: .nonNull(.scalar(String.self))),
        GraphQLField("images", type: .list(.scalar(String.self))),
        GraphQLField("tag", type: .object(Tag.selections)),
        GraphQLField("comments", type: .list(.scalar(GraphQLID.self))),
        GraphQLField("subscribedUsers", type: .list(.object(SubscribedUser.selections))),
        GraphQLField("createdAt", type: .scalar(String.self)),
        GraphQLField("updatedAt", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil, title: String, user: User, content: String, images: [String?]? = nil, tag: Tag? = nil, comments: [GraphQLID?]? = nil, subscribedUsers: [SubscribedUser?]? = nil, createdAt: String? = nil, updatedAt: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "Message", "_id": id, "title": title, "user": user.resultMap, "content": content, "images": images, "tag": tag.flatMap { (value: Tag) -> ResultMap in value.resultMap }, "comments": comments, "subscribedUsers": subscribedUsers.flatMap { (value: [SubscribedUser?]) -> [ResultMap?] in value.map { (value: SubscribedUser?) -> ResultMap? in value.flatMap { (value: SubscribedUser) -> ResultMap in value.resultMap } } }, "createdAt": createdAt, "updatedAt": updatedAt])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }

      public var title: String {
        get {
          return resultMap["title"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "title")
        }
      }

      public var user: User {
        get {
          return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "user")
        }
      }

      public var content: String {
        get {
          return resultMap["content"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "content")
        }
      }

      public var images: [String?]? {
        get {
          return resultMap["images"] as? [String?]
        }
        set {
          resultMap.updateValue(newValue, forKey: "images")
        }
      }

      public var tag: Tag? {
        get {
          return (resultMap["tag"] as? ResultMap).flatMap { Tag(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "tag")
        }
      }

      public var comments: [GraphQLID?]? {
        get {
          return resultMap["comments"] as? [GraphQLID?]
        }
        set {
          resultMap.updateValue(newValue, forKey: "comments")
        }
      }

      public var subscribedUsers: [SubscribedUser?]? {
        get {
          return (resultMap["subscribedUsers"] as? [ResultMap?]).flatMap { (value: [ResultMap?]) -> [SubscribedUser?] in value.map { (value: ResultMap?) -> SubscribedUser? in value.flatMap { (value: ResultMap) -> SubscribedUser in SubscribedUser(unsafeResultMap: value) } } }
        }
        set {
          resultMap.updateValue(newValue.flatMap { (value: [SubscribedUser?]) -> [ResultMap?] in value.map { (value: SubscribedUser?) -> ResultMap? in value.flatMap { (value: SubscribedUser) -> ResultMap in value.resultMap } } }, forKey: "subscribedUsers")
        }
      }

      public var createdAt: String? {
        get {
          return resultMap["createdAt"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "createdAt")
        }
      }

      public var updatedAt: String? {
        get {
          return resultMap["updatedAt"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "updatedAt")
        }
      }

      public struct User: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("firstName", type: .nonNull(.scalar(String.self))),
          GraphQLField("lastName", type: .nonNull(.scalar(String.self))),
          GraphQLField("avatar", type: .scalar(String.self)),
          GraphQLField("_id", type: .nonNull(.scalar(GraphQLID.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(firstName: String, lastName: String, avatar: String? = nil, id: GraphQLID) {
          self.init(unsafeResultMap: ["__typename": "User", "firstName": firstName, "lastName": lastName, "avatar": avatar, "_id": id])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var firstName: String {
          get {
            return resultMap["firstName"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "firstName")
          }
        }

        public var lastName: String {
          get {
            return resultMap["lastName"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "lastName")
          }
        }

        public var avatar: String? {
          get {
            return resultMap["avatar"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "avatar")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["_id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "_id")
          }
        }
      }

      public struct Tag: GraphQLSelectionSet {
        public static let possibleTypes = ["Tag"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("name", type: .nonNull(.scalar(String.self))),
          GraphQLField("_id", type: .scalar(GraphQLID.self)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(name: String, id: GraphQLID? = nil) {
          self.init(unsafeResultMap: ["__typename": "Tag", "name": name, "_id": id])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var name: String {
          get {
            return resultMap["name"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "name")
          }
        }

        public var id: GraphQLID? {
          get {
            return resultMap["_id"] as? GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "_id")
          }
        }
      }

      public struct SubscribedUser: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("firstName", type: .nonNull(.scalar(String.self))),
          GraphQLField("lastName", type: .nonNull(.scalar(String.self))),
          GraphQLField("avatar", type: .scalar(String.self)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(firstName: String, lastName: String, avatar: String? = nil) {
          self.init(unsafeResultMap: ["__typename": "User", "firstName": firstName, "lastName": lastName, "avatar": avatar])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var firstName: String {
          get {
            return resultMap["firstName"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "firstName")
          }
        }

        public var lastName: String {
          get {
            return resultMap["lastName"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "lastName")
          }
        }

        public var avatar: String? {
          get {
            return resultMap["avatar"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "avatar")
          }
        }
      }
    }
  }
}

public final class FindTagsByTeamQuery: GraphQLQuery {
  public let operationDefinition =
    "query FindTagsByTeam($teamId: ID!) {\n  findTagsByTeam(input: {team: $teamId}) {\n    __typename\n    _id\n    name\n  }\n}"

  public var teamId: GraphQLID

  public init(teamId: GraphQLID) {
    self.teamId = teamId
  }

  public var variables: GraphQLMap? {
    return ["teamId": teamId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("findTagsByTeam", arguments: ["input": ["team": GraphQLVariable("teamId")]], type: .list(.object(FindTagsByTeam.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(findTagsByTeam: [FindTagsByTeam?]? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "findTagsByTeam": findTagsByTeam.flatMap { (value: [FindTagsByTeam?]) -> [ResultMap?] in value.map { (value: FindTagsByTeam?) -> ResultMap? in value.flatMap { (value: FindTagsByTeam) -> ResultMap in value.resultMap } } }])
    }

    public var findTagsByTeam: [FindTagsByTeam?]? {
      get {
        return (resultMap["findTagsByTeam"] as? [ResultMap?]).flatMap { (value: [ResultMap?]) -> [FindTagsByTeam?] in value.map { (value: ResultMap?) -> FindTagsByTeam? in value.flatMap { (value: ResultMap) -> FindTagsByTeam in FindTagsByTeam(unsafeResultMap: value) } } }
      }
      set {
        resultMap.updateValue(newValue.flatMap { (value: [FindTagsByTeam?]) -> [ResultMap?] in value.map { (value: FindTagsByTeam?) -> ResultMap? in value.flatMap { (value: FindTagsByTeam) -> ResultMap in value.resultMap } } }, forKey: "findTagsByTeam")
      }
    }

    public struct FindTagsByTeam: GraphQLSelectionSet {
      public static let possibleTypes = ["Tag"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
        GraphQLField("name", type: .nonNull(.scalar(String.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil, name: String) {
        self.init(unsafeResultMap: ["__typename": "Tag", "_id": id, "name": name])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }

      public var name: String {
        get {
          return resultMap["name"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "name")
        }
      }
    }
  }
}

public final class InviteUserToTeamMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation InviteUserToTeam($id: ID!, $email: String, $phoneNumber: String) {\n  inviteUser(input: {id: $id, email: $email, phoneNumber: $phoneNumber}) {\n    __typename\n    _id\n  }\n}"

  public var id: GraphQLID
  public var email: String?
  public var phoneNumber: String?

  public init(id: GraphQLID, email: String? = nil, phoneNumber: String? = nil) {
    self.id = id
    self.email = email
    self.phoneNumber = phoneNumber
  }

  public var variables: GraphQLMap? {
    return ["id": id, "email": email, "phoneNumber": phoneNumber]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("inviteUser", arguments: ["input": ["id": GraphQLVariable("id"), "email": GraphQLVariable("email"), "phoneNumber": GraphQLVariable("phoneNumber")]], type: .object(InviteUser.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(inviteUser: InviteUser? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "inviteUser": inviteUser.flatMap { (value: InviteUser) -> ResultMap in value.resultMap }])
    }

    public var inviteUser: InviteUser? {
      get {
        return (resultMap["inviteUser"] as? ResultMap).flatMap { InviteUser(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "inviteUser")
      }
    }

    public struct InviteUser: GraphQLSelectionSet {
      public static let possibleTypes = ["Team"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil) {
        self.init(unsafeResultMap: ["__typename": "Team", "_id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }
    }
  }
}

public final class FindCommentsByMessageQuery: GraphQLQuery {
  public let operationDefinition =
    "query FindCommentsByMessage($messageId: ID!) {\n  findMsgCommentsByMessage(input: {message: $messageId}) {\n    __typename\n    _id\n    user {\n      __typename\n      firstName\n      lastName\n      avatar\n      _id\n    }\n    content\n    image\n    likes {\n      __typename\n      _id\n      firstName\n    }\n    createdAt\n    updatedAt\n  }\n}"

  public var messageId: GraphQLID

  public init(messageId: GraphQLID) {
    self.messageId = messageId
  }

  public var variables: GraphQLMap? {
    return ["messageId": messageId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("findMsgCommentsByMessage", arguments: ["input": ["message": GraphQLVariable("messageId")]], type: .list(.object(FindMsgCommentsByMessage.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(findMsgCommentsByMessage: [FindMsgCommentsByMessage?]? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "findMsgCommentsByMessage": findMsgCommentsByMessage.flatMap { (value: [FindMsgCommentsByMessage?]) -> [ResultMap?] in value.map { (value: FindMsgCommentsByMessage?) -> ResultMap? in value.flatMap { (value: FindMsgCommentsByMessage) -> ResultMap in value.resultMap } } }])
    }

    public var findMsgCommentsByMessage: [FindMsgCommentsByMessage?]? {
      get {
        return (resultMap["findMsgCommentsByMessage"] as? [ResultMap?]).flatMap { (value: [ResultMap?]) -> [FindMsgCommentsByMessage?] in value.map { (value: ResultMap?) -> FindMsgCommentsByMessage? in value.flatMap { (value: ResultMap) -> FindMsgCommentsByMessage in FindMsgCommentsByMessage(unsafeResultMap: value) } } }
      }
      set {
        resultMap.updateValue(newValue.flatMap { (value: [FindMsgCommentsByMessage?]) -> [ResultMap?] in value.map { (value: FindMsgCommentsByMessage?) -> ResultMap? in value.flatMap { (value: FindMsgCommentsByMessage) -> ResultMap in value.resultMap } } }, forKey: "findMsgCommentsByMessage")
      }
    }

    public struct FindMsgCommentsByMessage: GraphQLSelectionSet {
      public static let possibleTypes = ["MsgComment"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
        GraphQLField("user", type: .nonNull(.object(User.selections))),
        GraphQLField("content", type: .nonNull(.scalar(String.self))),
        GraphQLField("image", type: .scalar(String.self)),
        GraphQLField("likes", type: .list(.object(Like.selections))),
        GraphQLField("createdAt", type: .scalar(String.self)),
        GraphQLField("updatedAt", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil, user: User, content: String, image: String? = nil, likes: [Like?]? = nil, createdAt: String? = nil, updatedAt: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "MsgComment", "_id": id, "user": user.resultMap, "content": content, "image": image, "likes": likes.flatMap { (value: [Like?]) -> [ResultMap?] in value.map { (value: Like?) -> ResultMap? in value.flatMap { (value: Like) -> ResultMap in value.resultMap } } }, "createdAt": createdAt, "updatedAt": updatedAt])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }

      public var user: User {
        get {
          return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "user")
        }
      }

      public var content: String {
        get {
          return resultMap["content"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "content")
        }
      }

      public var image: String? {
        get {
          return resultMap["image"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "image")
        }
      }

      public var likes: [Like?]? {
        get {
          return (resultMap["likes"] as? [ResultMap?]).flatMap { (value: [ResultMap?]) -> [Like?] in value.map { (value: ResultMap?) -> Like? in value.flatMap { (value: ResultMap) -> Like in Like(unsafeResultMap: value) } } }
        }
        set {
          resultMap.updateValue(newValue.flatMap { (value: [Like?]) -> [ResultMap?] in value.map { (value: Like?) -> ResultMap? in value.flatMap { (value: Like) -> ResultMap in value.resultMap } } }, forKey: "likes")
        }
      }

      public var createdAt: String? {
        get {
          return resultMap["createdAt"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "createdAt")
        }
      }

      public var updatedAt: String? {
        get {
          return resultMap["updatedAt"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "updatedAt")
        }
      }

      public struct User: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("firstName", type: .nonNull(.scalar(String.self))),
          GraphQLField("lastName", type: .nonNull(.scalar(String.self))),
          GraphQLField("avatar", type: .scalar(String.self)),
          GraphQLField("_id", type: .nonNull(.scalar(GraphQLID.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(firstName: String, lastName: String, avatar: String? = nil, id: GraphQLID) {
          self.init(unsafeResultMap: ["__typename": "User", "firstName": firstName, "lastName": lastName, "avatar": avatar, "_id": id])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var firstName: String {
          get {
            return resultMap["firstName"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "firstName")
          }
        }

        public var lastName: String {
          get {
            return resultMap["lastName"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "lastName")
          }
        }

        public var avatar: String? {
          get {
            return resultMap["avatar"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "avatar")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["_id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "_id")
          }
        }
      }

      public struct Like: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("_id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("firstName", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, firstName: String) {
          self.init(unsafeResultMap: ["__typename": "User", "_id": id, "firstName": firstName])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["_id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "_id")
          }
        }

        public var firstName: String {
          get {
            return resultMap["firstName"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "firstName")
          }
        }
      }
    }
  }
}

public final class LikeCommentMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation likeComment($id: ID!) {\n  likeMsgComment(input: {id: $id}) {\n    __typename\n    _id\n  }\n}"

  public var id: GraphQLID

  public init(id: GraphQLID) {
    self.id = id
  }

  public var variables: GraphQLMap? {
    return ["id": id]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("likeMsgComment", arguments: ["input": ["id": GraphQLVariable("id")]], type: .object(LikeMsgComment.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(likeMsgComment: LikeMsgComment? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "likeMsgComment": likeMsgComment.flatMap { (value: LikeMsgComment) -> ResultMap in value.resultMap }])
    }

    public var likeMsgComment: LikeMsgComment? {
      get {
        return (resultMap["likeMsgComment"] as? ResultMap).flatMap { LikeMsgComment(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "likeMsgComment")
      }
    }

    public struct LikeMsgComment: GraphQLSelectionSet {
      public static let possibleTypes = ["MsgComment"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil) {
        self.init(unsafeResultMap: ["__typename": "MsgComment", "_id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }
    }
  }
}

public final class UnlikeCommentMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation unlikeComment($id: ID!) {\n  unLikeMsgComment(input: {id: $id}) {\n    __typename\n    _id\n  }\n}"

  public var id: GraphQLID

  public init(id: GraphQLID) {
    self.id = id
  }

  public var variables: GraphQLMap? {
    return ["id": id]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("unLikeMsgComment", arguments: ["input": ["id": GraphQLVariable("id")]], type: .object(UnLikeMsgComment.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(unLikeMsgComment: UnLikeMsgComment? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "unLikeMsgComment": unLikeMsgComment.flatMap { (value: UnLikeMsgComment) -> ResultMap in value.resultMap }])
    }

    public var unLikeMsgComment: UnLikeMsgComment? {
      get {
        return (resultMap["unLikeMsgComment"] as? ResultMap).flatMap { UnLikeMsgComment(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "unLikeMsgComment")
      }
    }

    public struct UnLikeMsgComment: GraphQLSelectionSet {
      public static let possibleTypes = ["MsgComment"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil) {
        self.init(unsafeResultMap: ["__typename": "MsgComment", "_id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }
    }
  }
}

public final class DeleteCommentMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation deleteComment($id: ID!) {\n  deleteMsgComment(input: {id: $id}) {\n    __typename\n    _id\n  }\n}"

  public var id: GraphQLID

  public init(id: GraphQLID) {
    self.id = id
  }

  public var variables: GraphQLMap? {
    return ["id": id]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("deleteMsgComment", arguments: ["input": ["id": GraphQLVariable("id")]], type: .object(DeleteMsgComment.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(deleteMsgComment: DeleteMsgComment? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "deleteMsgComment": deleteMsgComment.flatMap { (value: DeleteMsgComment) -> ResultMap in value.resultMap }])
    }

    public var deleteMsgComment: DeleteMsgComment? {
      get {
        return (resultMap["deleteMsgComment"] as? ResultMap).flatMap { DeleteMsgComment(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "deleteMsgComment")
      }
    }

    public struct DeleteMsgComment: GraphQLSelectionSet {
      public static let possibleTypes = ["MsgComment"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil) {
        self.init(unsafeResultMap: ["__typename": "MsgComment", "_id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }
    }
  }
}

public final class UpdateUserMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation UpdateUser($firstName: String, $lastName: String, $email: String, $phoneNumber: String, $avatar: String, $receiveEmails: Boolean, $receiveTexts: Boolean) {\n  updateUser(input: {firstName: $firstName, lastName: $lastName, email: $email, phoneNumber: $phoneNumber, avatar: $avatar, toggles: {receiveEmails: $receiveEmails, receiveTexts: $receiveTexts}}) {\n    __typename\n    _id\n  }\n}"

  public var firstName: String?
  public var lastName: String?
  public var email: String?
  public var phoneNumber: String?
  public var avatar: String?
  public var receiveEmails: Bool?
  public var receiveTexts: Bool?

  public init(firstName: String? = nil, lastName: String? = nil, email: String? = nil, phoneNumber: String? = nil, avatar: String? = nil, receiveEmails: Bool? = nil, receiveTexts: Bool? = nil) {
    self.firstName = firstName
    self.lastName = lastName
    self.email = email
    self.phoneNumber = phoneNumber
    self.avatar = avatar
    self.receiveEmails = receiveEmails
    self.receiveTexts = receiveTexts
  }

  public var variables: GraphQLMap? {
    return ["firstName": firstName, "lastName": lastName, "email": email, "phoneNumber": phoneNumber, "avatar": avatar, "receiveEmails": receiveEmails, "receiveTexts": receiveTexts]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("updateUser", arguments: ["input": ["firstName": GraphQLVariable("firstName"), "lastName": GraphQLVariable("lastName"), "email": GraphQLVariable("email"), "phoneNumber": GraphQLVariable("phoneNumber"), "avatar": GraphQLVariable("avatar"), "toggles": ["receiveEmails": GraphQLVariable("receiveEmails"), "receiveTexts": GraphQLVariable("receiveTexts")]]], type: .object(UpdateUser.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(updateUser: UpdateUser? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "updateUser": updateUser.flatMap { (value: UpdateUser) -> ResultMap in value.resultMap }])
    }

    public var updateUser: UpdateUser? {
      get {
        return (resultMap["updateUser"] as? ResultMap).flatMap { UpdateUser(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "updateUser")
      }
    }

    public struct UpdateUser: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .nonNull(.scalar(GraphQLID.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID) {
        self.init(unsafeResultMap: ["__typename": "User", "_id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["_id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }
    }
  }
}

public final class UpdateTeamMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation updateTeam($id: ID!, $name: String, $users: [TeamUserInput], $premium: Boolean) {\n  updateTeam(input: {id: $id, name: $name, users: $users, premium: $premium}) {\n    __typename\n    _id\n  }\n}"

  public var id: GraphQLID
  public var name: String?
  public var users: [TeamUserInput?]?
  public var premium: Bool?

  public init(id: GraphQLID, name: String? = nil, users: [TeamUserInput?]? = nil, premium: Bool? = nil) {
    self.id = id
    self.name = name
    self.users = users
    self.premium = premium
  }

  public var variables: GraphQLMap? {
    return ["id": id, "name": name, "users": users, "premium": premium]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("updateTeam", arguments: ["input": ["id": GraphQLVariable("id"), "name": GraphQLVariable("name"), "users": GraphQLVariable("users"), "premium": GraphQLVariable("premium")]], type: .object(UpdateTeam.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(updateTeam: UpdateTeam? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "updateTeam": updateTeam.flatMap { (value: UpdateTeam) -> ResultMap in value.resultMap }])
    }

    public var updateTeam: UpdateTeam? {
      get {
        return (resultMap["updateTeam"] as? ResultMap).flatMap { UpdateTeam(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "updateTeam")
      }
    }

    public struct UpdateTeam: GraphQLSelectionSet {
      public static let possibleTypes = ["Team"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil) {
        self.init(unsafeResultMap: ["__typename": "Team", "_id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }
    }
  }
}

public final class AddNewMessageMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation AddNewMessage($title: String!, $team: String!, $content: String!, $tagId: String) {\n  addMessage(input: {title: $title, team: $team, content: $content, tag: $tagId}) {\n    __typename\n    title\n    _id\n  }\n}"

  public var title: String
  public var team: String
  public var content: String
  public var tagId: String?

  public init(title: String, team: String, content: String, tagId: String? = nil) {
    self.title = title
    self.team = team
    self.content = content
    self.tagId = tagId
  }

  public var variables: GraphQLMap? {
    return ["title": title, "team": team, "content": content, "tagId": tagId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("addMessage", arguments: ["input": ["title": GraphQLVariable("title"), "team": GraphQLVariable("team"), "content": GraphQLVariable("content"), "tag": GraphQLVariable("tagId")]], type: .object(AddMessage.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(addMessage: AddMessage? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "addMessage": addMessage.flatMap { (value: AddMessage) -> ResultMap in value.resultMap }])
    }

    public var addMessage: AddMessage? {
      get {
        return (resultMap["addMessage"] as? ResultMap).flatMap { AddMessage(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "addMessage")
      }
    }

    public struct AddMessage: GraphQLSelectionSet {
      public static let possibleTypes = ["Message"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("title", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(title: String, id: GraphQLID? = nil) {
        self.init(unsafeResultMap: ["__typename": "Message", "title": title, "_id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var title: String {
        get {
          return resultMap["title"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "title")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }
    }
  }
}

public final class AddNewImagesMessageMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation AddNewImagesMessage($title: String!, $team: String!, $content: String!, $images: [String], $tagId: String) {\n  addMessage(input: {title: $title, team: $team, content: $content, images: $images, tag: $tagId}) {\n    __typename\n    title\n    _id\n  }\n}"

  public var title: String
  public var team: String
  public var content: String
  public var images: [String?]?
  public var tagId: String?

  public init(title: String, team: String, content: String, images: [String?]? = nil, tagId: String? = nil) {
    self.title = title
    self.team = team
    self.content = content
    self.images = images
    self.tagId = tagId
  }

  public var variables: GraphQLMap? {
    return ["title": title, "team": team, "content": content, "images": images, "tagId": tagId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("addMessage", arguments: ["input": ["title": GraphQLVariable("title"), "team": GraphQLVariable("team"), "content": GraphQLVariable("content"), "images": GraphQLVariable("images"), "tag": GraphQLVariable("tagId")]], type: .object(AddMessage.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(addMessage: AddMessage? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "addMessage": addMessage.flatMap { (value: AddMessage) -> ResultMap in value.resultMap }])
    }

    public var addMessage: AddMessage? {
      get {
        return (resultMap["addMessage"] as? ResultMap).flatMap { AddMessage(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "addMessage")
      }
    }

    public struct AddMessage: GraphQLSelectionSet {
      public static let possibleTypes = ["Message"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("title", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(title: String, id: GraphQLID? = nil) {
        self.init(unsafeResultMap: ["__typename": "Message", "title": title, "_id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var title: String {
        get {
          return resultMap["title"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "title")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }
    }
  }
}

public final class UpdateMessageMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation UpdateMessage($id: ID!, $title: String, $teamId: String, $content: String, $images: [String], $tagId: String) {\n  updateMessage(input: {id: $id, title: $title, team: $teamId, content: $content, images: $images, tag: $tagId}) {\n    __typename\n    title\n  }\n}"

  public var id: GraphQLID
  public var title: String?
  public var teamId: String?
  public var content: String?
  public var images: [String?]?
  public var tagId: String?

  public init(id: GraphQLID, title: String? = nil, teamId: String? = nil, content: String? = nil, images: [String?]? = nil, tagId: String? = nil) {
    self.id = id
    self.title = title
    self.teamId = teamId
    self.content = content
    self.images = images
    self.tagId = tagId
  }

  public var variables: GraphQLMap? {
    return ["id": id, "title": title, "teamId": teamId, "content": content, "images": images, "tagId": tagId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("updateMessage", arguments: ["input": ["id": GraphQLVariable("id"), "title": GraphQLVariable("title"), "team": GraphQLVariable("teamId"), "content": GraphQLVariable("content"), "images": GraphQLVariable("images"), "tag": GraphQLVariable("tagId")]], type: .object(UpdateMessage.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(updateMessage: UpdateMessage? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "updateMessage": updateMessage.flatMap { (value: UpdateMessage) -> ResultMap in value.resultMap }])
    }

    public var updateMessage: UpdateMessage? {
      get {
        return (resultMap["updateMessage"] as? ResultMap).flatMap { UpdateMessage(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "updateMessage")
      }
    }

    public struct UpdateMessage: GraphQLSelectionSet {
      public static let possibleTypes = ["Message"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("title", type: .nonNull(.scalar(String.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(title: String) {
        self.init(unsafeResultMap: ["__typename": "Message", "title": title])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var title: String {
        get {
          return resultMap["title"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "title")
        }
      }
    }
  }
}

public final class CreateNewTagMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation CreateNewTag($name: String!, $teamId: String) {\n  addTag(input: {name: $name, team: $teamId}) {\n    __typename\n    _id\n    name\n  }\n}"

  public var name: String
  public var teamId: String?

  public init(name: String, teamId: String? = nil) {
    self.name = name
    self.teamId = teamId
  }

  public var variables: GraphQLMap? {
    return ["name": name, "teamId": teamId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("addTag", arguments: ["input": ["name": GraphQLVariable("name"), "team": GraphQLVariable("teamId")]], type: .object(AddTag.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(addTag: AddTag? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "addTag": addTag.flatMap { (value: AddTag) -> ResultMap in value.resultMap }])
    }

    public var addTag: AddTag? {
      get {
        return (resultMap["addTag"] as? ResultMap).flatMap { AddTag(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "addTag")
      }
    }

    public struct AddTag: GraphQLSelectionSet {
      public static let possibleTypes = ["Tag"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
        GraphQLField("name", type: .nonNull(.scalar(String.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil, name: String) {
        self.init(unsafeResultMap: ["__typename": "Tag", "_id": id, "name": name])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }

      public var name: String {
        get {
          return resultMap["name"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "name")
        }
      }
    }
  }
}

public final class FindTeamsByUserQuery: GraphQLQuery {
  public let operationDefinition =
    "query findTeamsByUser {\n  findTeamsByUser {\n    __typename\n    name\n    _id\n    premium\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("findTeamsByUser", type: .list(.object(FindTeamsByUser.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(findTeamsByUser: [FindTeamsByUser?]? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "findTeamsByUser": findTeamsByUser.flatMap { (value: [FindTeamsByUser?]) -> [ResultMap?] in value.map { (value: FindTeamsByUser?) -> ResultMap? in value.flatMap { (value: FindTeamsByUser) -> ResultMap in value.resultMap } } }])
    }

    public var findTeamsByUser: [FindTeamsByUser?]? {
      get {
        return (resultMap["findTeamsByUser"] as? [ResultMap?]).flatMap { (value: [ResultMap?]) -> [FindTeamsByUser?] in value.map { (value: ResultMap?) -> FindTeamsByUser? in value.flatMap { (value: ResultMap) -> FindTeamsByUser in FindTeamsByUser(unsafeResultMap: value) } } }
      }
      set {
        resultMap.updateValue(newValue.flatMap { (value: [FindTeamsByUser?]) -> [ResultMap?] in value.map { (value: FindTeamsByUser?) -> ResultMap? in value.flatMap { (value: FindTeamsByUser) -> ResultMap in value.resultMap } } }, forKey: "findTeamsByUser")
      }
    }

    public struct FindTeamsByUser: GraphQLSelectionSet {
      public static let possibleTypes = ["Team"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("name", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
        GraphQLField("premium", type: .nonNull(.scalar(Bool.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(name: String, id: GraphQLID? = nil, premium: Bool) {
        self.init(unsafeResultMap: ["__typename": "Team", "name": name, "_id": id, "premium": premium])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var name: String {
        get {
          return resultMap["name"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "name")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }

      public var premium: Bool {
        get {
          return resultMap["premium"]! as! Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "premium")
        }
      }
    }
  }
}

public final class CreateTeamMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation CreateTeam($name: String!, $premium: Boolean) {\n  addTeam(input: {name: $name, premium: $premium}) {\n    __typename\n    _id\n  }\n}"

  public var name: String
  public var premium: Bool?

  public init(name: String, premium: Bool? = nil) {
    self.name = name
    self.premium = premium
  }

  public var variables: GraphQLMap? {
    return ["name": name, "premium": premium]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("addTeam", arguments: ["input": ["name": GraphQLVariable("name"), "premium": GraphQLVariable("premium")]], type: .object(AddTeam.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(addTeam: AddTeam? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "addTeam": addTeam.flatMap { (value: AddTeam) -> ResultMap in value.resultMap }])
    }

    public var addTeam: AddTeam? {
      get {
        return (resultMap["addTeam"] as? ResultMap).flatMap { AddTeam(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "addTeam")
      }
    }

    public struct AddTeam: GraphQLSelectionSet {
      public static let possibleTypes = ["Team"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil) {
        self.init(unsafeResultMap: ["__typename": "Team", "_id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }
    }
  }
}

public final class FindActivityByTeamQuery: GraphQLQuery {
  public let operationDefinition =
    "query FindActivityByTeam($teamId: ID!) {\n  findMessagesByTeam(input: {team: $teamId}) {\n    __typename\n    _id\n    title\n    user {\n      __typename\n      firstName\n      lastName\n      avatar\n      _id\n    }\n    content\n    images\n    tag {\n      __typename\n      name\n    }\n    comments\n    createdAt\n    updatedAt\n  }\n}"

  public var teamId: GraphQLID

  public init(teamId: GraphQLID) {
    self.teamId = teamId
  }

  public var variables: GraphQLMap? {
    return ["teamId": teamId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("findMessagesByTeam", arguments: ["input": ["team": GraphQLVariable("teamId")]], type: .list(.object(FindMessagesByTeam.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(findMessagesByTeam: [FindMessagesByTeam?]? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "findMessagesByTeam": findMessagesByTeam.flatMap { (value: [FindMessagesByTeam?]) -> [ResultMap?] in value.map { (value: FindMessagesByTeam?) -> ResultMap? in value.flatMap { (value: FindMessagesByTeam) -> ResultMap in value.resultMap } } }])
    }

    public var findMessagesByTeam: [FindMessagesByTeam?]? {
      get {
        return (resultMap["findMessagesByTeam"] as? [ResultMap?]).flatMap { (value: [ResultMap?]) -> [FindMessagesByTeam?] in value.map { (value: ResultMap?) -> FindMessagesByTeam? in value.flatMap { (value: ResultMap) -> FindMessagesByTeam in FindMessagesByTeam(unsafeResultMap: value) } } }
      }
      set {
        resultMap.updateValue(newValue.flatMap { (value: [FindMessagesByTeam?]) -> [ResultMap?] in value.map { (value: FindMessagesByTeam?) -> ResultMap? in value.flatMap { (value: FindMessagesByTeam) -> ResultMap in value.resultMap } } }, forKey: "findMessagesByTeam")
      }
    }

    public struct FindMessagesByTeam: GraphQLSelectionSet {
      public static let possibleTypes = ["Message"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
        GraphQLField("title", type: .nonNull(.scalar(String.self))),
        GraphQLField("user", type: .nonNull(.object(User.selections))),
        GraphQLField("content", type: .nonNull(.scalar(String.self))),
        GraphQLField("images", type: .list(.scalar(String.self))),
        GraphQLField("tag", type: .object(Tag.selections)),
        GraphQLField("comments", type: .list(.scalar(GraphQLID.self))),
        GraphQLField("createdAt", type: .scalar(String.self)),
        GraphQLField("updatedAt", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil, title: String, user: User, content: String, images: [String?]? = nil, tag: Tag? = nil, comments: [GraphQLID?]? = nil, createdAt: String? = nil, updatedAt: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "Message", "_id": id, "title": title, "user": user.resultMap, "content": content, "images": images, "tag": tag.flatMap { (value: Tag) -> ResultMap in value.resultMap }, "comments": comments, "createdAt": createdAt, "updatedAt": updatedAt])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID? {
        get {
          return resultMap["_id"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "_id")
        }
      }

      public var title: String {
        get {
          return resultMap["title"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "title")
        }
      }

      public var user: User {
        get {
          return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "user")
        }
      }

      public var content: String {
        get {
          return resultMap["content"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "content")
        }
      }

      public var images: [String?]? {
        get {
          return resultMap["images"] as? [String?]
        }
        set {
          resultMap.updateValue(newValue, forKey: "images")
        }
      }

      public var tag: Tag? {
        get {
          return (resultMap["tag"] as? ResultMap).flatMap { Tag(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "tag")
        }
      }

      public var comments: [GraphQLID?]? {
        get {
          return resultMap["comments"] as? [GraphQLID?]
        }
        set {
          resultMap.updateValue(newValue, forKey: "comments")
        }
      }

      public var createdAt: String? {
        get {
          return resultMap["createdAt"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "createdAt")
        }
      }

      public var updatedAt: String? {
        get {
          return resultMap["updatedAt"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "updatedAt")
        }
      }

      public struct User: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("firstName", type: .nonNull(.scalar(String.self))),
          GraphQLField("lastName", type: .nonNull(.scalar(String.self))),
          GraphQLField("avatar", type: .scalar(String.self)),
          GraphQLField("_id", type: .nonNull(.scalar(GraphQLID.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(firstName: String, lastName: String, avatar: String? = nil, id: GraphQLID) {
          self.init(unsafeResultMap: ["__typename": "User", "firstName": firstName, "lastName": lastName, "avatar": avatar, "_id": id])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var firstName: String {
          get {
            return resultMap["firstName"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "firstName")
          }
        }

        public var lastName: String {
          get {
            return resultMap["lastName"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "lastName")
          }
        }

        public var avatar: String? {
          get {
            return resultMap["avatar"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "avatar")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["_id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "_id")
          }
        }
      }

      public struct Tag: GraphQLSelectionSet {
        public static let possibleTypes = ["Tag"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("name", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(name: String) {
          self.init(unsafeResultMap: ["__typename": "Tag", "name": name])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var name: String {
          get {
            return resultMap["name"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "name")
          }
        }
      }
    }
  }
}