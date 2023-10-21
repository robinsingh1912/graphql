import { books } from '../data/index.js';

const Library = {
  books(parent) {
    return books.filter((book) => book.library === parent.name);
  },
};

export default Library;
