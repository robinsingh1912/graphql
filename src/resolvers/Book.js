const Book = {
  author(parent, _args, { authors }) {
    const author = authors.find((author) => author.name === parent.author);
    console.log({ author });
    return author ? { name: author.name } : { name: 'Unknown Author' };
  },
};

export default Book;
