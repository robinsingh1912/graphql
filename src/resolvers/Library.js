const Library = {
  books({ name }, _args, { books }) {
    return books.filter((book) => book.library === name);
  },
};

export default Library;
