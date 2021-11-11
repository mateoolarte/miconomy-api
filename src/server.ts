import { ApolloServer } from 'apollo-server';
import { createContext } from './config/context';
import { schema } from './graphql/schema';

export const server = new ApolloServer({
  schema,
  context: ({ req }) => createContext(req),
});
