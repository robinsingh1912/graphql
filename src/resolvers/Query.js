import { libraries, authors, books, users } from '../data/index.js';

const Query = {
  libraries: () => libraries,
  books: () => books,
  user: (_parent, args, _contextValue, _info) => {
    return users.find((user) => user.id === args.id);
  },
  authors: () => authors,
  users: () => users,
};

export default Query;
