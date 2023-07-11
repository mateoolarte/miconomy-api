import { startStandaloneServer } from "@apollo/server/standalone";

import { server } from "./server";
import { createContext } from "./config/context";

async function runServer() {
  const port = Number(process.env.PORT) || 4000;
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => createContext(req),
    listen: { port },
  });

  console.log(`🚀 Server ready at ${url}`);
}

runServer();
