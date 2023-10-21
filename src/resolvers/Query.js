const Query = {
  // (_parent, _args, _context, _info)
  libraries: (_parent, _args, { libraries }, _info) => libraries,
  books: (_parent, _args, { books }, _info) => books,
  user: (_parent, args, { users }, _info) => {
    return users.find((user) => user.id === args.id);
  },
  users: (_parent, _args, { users }, _info) => users,
  authors: (_parent, _args, { authors }, _info) => authors,
};

export default Query;
