import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { createContext } from "./context";

const PORT = process.env.PORT || 4000;
const server = new ApolloServer({
  schema,
  context: createContext,
  playground: true,
});

server.listen({ port: PORT }, () =>
  console.log(`Server ready at PORT: ${PORT} 🚀`)
);
