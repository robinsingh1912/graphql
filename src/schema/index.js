const typeDefs = `#graphql

  type Library {
    name: String!
    books: [Book!]
  }
  type Book {
    id:ID!
    title: String!
    author: Author!
  }

  type Author {
    name: String!
  }

  type User {
    id: ID!
    name: String!
  }
  
  type Query {
    libraries: [Library!]
    books: [Book!]
    authors: [Author!]
    user(id: ID!): User
    users: [User]  
  }

  type Mutation {
    addBook(title: String!, author: String!, library:String): Book,
    updateBook(id: ID!, title: String, author: String, library: String): Book
}
`;

export default typeDefs;
