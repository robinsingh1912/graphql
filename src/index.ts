import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql

 type Library {
   name: String!
   books: [Book!]
 }
  type Book {
    title: String!
    author: Author!
  }

  type Author {
    name: String!
    books: [Book!]
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
    id: '1',
    name: 'John Doe',
  },
  {
    id: '2',
    name: 'Jane Smith',
  },
];

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    libraries: () => libraries,
    books: () => books,
    user: (parent, args, contextValue, info) => {
      return users.find((user) => user.id === args.id);
    },
    users: () => users,
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const newBook = {
        title,
        author,
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
