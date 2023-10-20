import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

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
   addBook(title: String!, author: String): Book
}
`;

const libraries = [
  {
    name: 'downtown',
  },
  {
    name: 'riverside',
  },
];

const users = [
  {
    id: 'user-1',
    name: 'John Doe',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
  },
];

const authors = [
  {
    name: 'Robin',
  },
  {
    name: 'Gaurav',
  },
];

const books = [
  {
    id: 'book-1',
    title: 'The Awakening',
    author: 'Kate Chopin',
    library: 'downtown',
  },
  {
    id: 'book-2',
    title: 'City of Glass',
    author: 'Paul Auster',
    library: 'riverside',
  },
];

const resolvers = {
  Query: {
    libraries: () => libraries,
    books: () => books,
    user: (parent, args, contextValue, info) => {
      return users.find((user) => user.id === args.id);
    },
    authors: () => authors,
    users: () => users,
  },
  Mutation: {
    addBook: (_, { title, author, library = 'unknown' }) => {
      const newBook = {
        id: Date.now().toString(),
        title,
        author,
        library,
      };
      books.push(newBook);
      return newBook;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
