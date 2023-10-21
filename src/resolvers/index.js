import { libraries, authors, books, users } from '../data/index.js';

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

export default resolvers;
