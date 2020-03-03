const typeDefinitions = `
  type Post {
    id: Int
    text: String
    user: User
  }

  type User {
    id: Int
    avatar: String
    username: String
  }

  type Message {
    id: Int
    text: String
    chat: Chat
    user: User
  }

  type Chat {
    id: Int
    messages: [Message]
    users: [User]
  }

  input PostInput {
    text: String!
  }
  
  input UserInput {
    username: String!
    avatar: String!
  }
  
  type RootMutation {
    addPost (
      post: PostInput!
    ): Post
  }

  type RootQuery {
    posts: [Post]
    chats: [Chat]
    chat(chatId: Int): Chat
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export default [typeDefinitions];
