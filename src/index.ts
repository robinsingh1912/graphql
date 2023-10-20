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
   addBook(title: String!, author: String!, library:String): Book,
   updateBook(id: ID!, title: String, author: String, library: String): Book
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
    author: 'Robin',
    library: 'downtown',
  },
  {
    id: 'book-2',
    title: 'City of Glass',
    author: 'Gaurav',
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
  Library: {
    books(parent) {
      return books.filter((book) => book.library === parent.name);
    },
  },
  Book: {
    author(parent) {
      const author = authors.find((author) => author.name === parent.author);
      return author ? { name: author.name } : { name: 'Unknown Author' };
    },
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
    updateBook: (_, { id, title, author, library }) => {
      const bookIndex = books.findIndex((book) => book.id === id);
      if (bookIndex === -1) {
        throw new Error('Book not found');
      }
      // Update the specified fields if provided
      if (title) {
        books[bookIndex].title = title;
      }
      if (author) {
        books[bookIndex].author = author;
      }
      if (library) {
        books[bookIndex].library = library;
      }

      // Return the updated book
      return books[bookIndex];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
