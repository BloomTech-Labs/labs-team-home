//  This file was automatically generated and should not be edited.

import Apollo

public final class FindTeamByIdQuery: GraphQLQuery {
  public let operationDefinition =
    "query FindTeamById($id: ID!) {\n  findTeam(input: {id: $id}) {\n    __typename\n    name\n    users {\n      __typename\n      user {\n        __typename\n        _id\n      }\n      admin\n    }\n  }\n}"

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
        GraphQLField("name", type: .nonNull(.scalar(String.self))),
        GraphQLField("users", type: .list(.object(User.selections))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(name: String, users: [User?]? = nil) {
        self.init(unsafeResultMap: ["__typename": "Team", "name": name, "users": users.flatMap { (value: [User?]) -> [ResultMap?] in value.map { (value: User?) -> ResultMap? in value.flatMap { (value: User) -> ResultMap in value.resultMap } } }])
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
            GraphQLField("_id", type: .scalar(GraphQLID.self)),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(id: GraphQLID? = nil) {
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
  }
}

public final class UpdateUserMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation UpdateUser($id: ID!, $firstName: String, $lastName: String, $email: String, $phoneNumber: String, $avatar: String, $receiveEmails: Boolean, $receiveTexts: Boolean) {\n  updateUser(input: {id: $id, firstName: $firstName, lastName: $lastName, email: $email, phoneNumber: $phoneNumber, avatar: $avatar, toggles: {receiveEmails: $receiveEmails, receiveTexts: $receiveTexts}}) {\n    __typename\n    _id\n  }\n}"

  public var id: GraphQLID
  public var firstName: String?
  public var lastName: String?
  public var email: String?
  public var phoneNumber: String?
  public var avatar: String?
  public var receiveEmails: Bool?
  public var receiveTexts: Bool?

  public init(id: GraphQLID, firstName: String? = nil, lastName: String? = nil, email: String? = nil, phoneNumber: String? = nil, avatar: String? = nil, receiveEmails: Bool? = nil, receiveTexts: Bool? = nil) {
    self.id = id
    self.firstName = firstName
    self.lastName = lastName
    self.email = email
    self.phoneNumber = phoneNumber
    self.avatar = avatar
    self.receiveEmails = receiveEmails
    self.receiveTexts = receiveTexts
  }

  public var variables: GraphQLMap? {
    return ["id": id, "firstName": firstName, "lastName": lastName, "email": email, "phoneNumber": phoneNumber, "avatar": avatar, "receiveEmails": receiveEmails, "receiveTexts": receiveTexts]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("updateUser", arguments: ["input": ["id": GraphQLVariable("id"), "firstName": GraphQLVariable("firstName"), "lastName": GraphQLVariable("lastName"), "email": GraphQLVariable("email"), "phoneNumber": GraphQLVariable("phoneNumber"), "avatar": GraphQLVariable("avatar"), "toggles": ["receiveEmails": GraphQLVariable("receiveEmails"), "receiveTexts": GraphQLVariable("receiveTexts")]]], type: .object(UpdateUser.selections)),
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
        GraphQLField("_id", type: .scalar(GraphQLID.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID? = nil) {
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

public final class FindTeamsByUserQuery: GraphQLQuery {
  public let operationDefinition =
    "query findTeamsByUser($userId: ID!) {\n  findTeamsByUser(input: {user: $userId}) {\n    __typename\n    name\n    _id\n  }\n}"

  public var userId: GraphQLID

  public init(userId: GraphQLID) {
    self.userId = userId
  }

  public var variables: GraphQLMap? {
    return ["userId": userId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("findTeamsByUser", arguments: ["input": ["user": GraphQLVariable("userId")]], type: .list(.object(FindTeamsByUser.selections))),
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
  }
}