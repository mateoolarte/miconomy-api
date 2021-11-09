import { ApolloServer } from 'apollo-server';
import { createContext } from './config/context';
import { schema } from './graphql/schema';

const server = new ApolloServer({
  schema,
  context: ({ req }) => createContext(req),
});

const PORT = process.env.PORT || 4000;

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
