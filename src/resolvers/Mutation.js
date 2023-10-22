const Mutation = {
  addBook: (_parent, { title, author, library = 'unknown' }, { books }) => {
    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      library,
    };
    books.push(newBook);
    return newBook;
  },
  updateBook: (_parent, { id, bookDetails }, { books }) => {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new Error('Book not found');
    }

    const { title, author, library } = bookDetails;
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
};

export default Mutation;
