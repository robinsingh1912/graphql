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
    books: [Book!]!
  }

  type User {
    id: ID!
    name: String!
  }
  
  type Query {
    libraries: [Library!]
    books: [Book!]!
    authors: [Author!]
    user(id: ID!): User
  }

  type Mutation {
   addBook(title: String!, author: String): Book
}
`;

const libraries = [
  {
    branch: 'downtown',
  },
  {
    branch: 'riverside',
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
    branch: 'riverside',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
    branch: 'downtown',
  },
];

const resolvers = {
  Query: {
    libraries: () => libraries,
    books: () => books,
    user: (parent, args, contextValue, info) => {
      return users.find((user) => user.id === args.id);
    },
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const newBook = {
        title,
        author,
        branch: 'unknown', // Assuming 'unknown' branch for the newly added book
      };
      books.push(newBook);
      return newBook;
    },
  },
  Library: {
    books(parent) {
      return books.filter((book) => book.branch === parent.branch);
    },
  },
  Book: {
    author(parent) {
      return {
        name: parent.author,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
