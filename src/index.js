import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema/index.js';
import resolvers from './resolvers/index.js';
import { authors, books, libraries, users } from './data/index.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: () => ({ authors, books, libraries, users }),
});

console.log(`🚀 Server listening at: ${url}`);
