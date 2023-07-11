import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import getPort, { makeRange } from 'get-port';
import { GraphQLClient } from 'graphql-request';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { Client } from 'pg';
import { db } from '../config/db';
import { server } from '../server';

type TestContext = {
  client: GraphQLClient;
  db: PrismaClient;
};

export function createTestContext(): TestContext {
  const ctx = {} as TestContext;

  const schema = `test_${nanoid(5)}`;
  const databaseUrl = `${process.env.DATABASE_URL}?schema=${schema}`;
  process.env.DATABASE_URL = databaseUrl;

  const graphqlCtx = graphqlTestContext();
  const prismaCtx = prismaTestContext();

  // beforeAll(async () => {
  //   const client = await graphqlCtx.before();
  //   const db = await prismaCtx.before();

  //   Object.assign(ctx, {
  //     client,
  //     db,
  //   });
  // });

  // afterAll(async () => {
  //   await graphqlCtx.after();
  //   await prismaCtx.after(schema, databaseUrl);
  // });

  return ctx;
}

function graphqlTestContext() {
  let serverInstance = null;

  return {
    async before() {
      const port = await getPort({ port: makeRange(4000, 6000) });

      // serverInstance = await server.listen({ port });
      // serverInstance.server.on('close', async () => {
      //   await db.$disconnect();
      // });

      return new GraphQLClient(`http://localhost:${port}`);
    },
    async after() {
      serverInstance?.server.close();
    },
  };
}

function prismaTestContext() {
  const prismaBinary = join(
    __dirname,
    '..',
    '..',
    'node_modules',
    '.bin',
    'prisma'
  );
  let prismaClient: null | PrismaClient = null;

  return {
    async before() {
      execSync(`${prismaBinary} migrate dev --name testing_cases`, {
        env: {
          ...process.env,
        },
      });

      prismaClient = new PrismaClient();

      return prismaClient;
    },
    async after(schema, databaseUrl) {
      const client = new Client({
        connectionString: `${databaseUrl}?ssl=false`,
      });
      await client.connect();
      await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
      await client.end();
      await prismaClient?.$disconnect();
    },
  };
}
