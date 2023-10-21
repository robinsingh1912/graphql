const Book = {
  author(parent) {
    const author = authors.find((author) => author.name === parent.author);
    return author ? { name: author.name } : { name: 'Unknown Author' };
  },
};

export default Book;
