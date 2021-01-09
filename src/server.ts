import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { createContext } from "./context";

const PORT = process.env.PORT || 4000;

new ApolloServer({ schema, context: createContext }).listen(
  { port: PORT },
  () => console.log(`Server ready at PORT: ${PORT} 🚀`)
);
