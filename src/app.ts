import { server } from './server';

const PORT = process.env.PORT || 4000;

server.listen({ port: PORT }, () =>
  console.log(`Server ready PORT:${PORT} 🚀`)
);
