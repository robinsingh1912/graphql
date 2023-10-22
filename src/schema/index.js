const typeDefs = `#graphql

  type Library {
    id:ID!
    name: String!
    books: [Book!]!
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
    updateBook(id: ID!, bookDetails:BookDetails): Book
}

  input BookDetails {
    title: String
    author: String
    library: String
  }

`;

export default typeDefs;
