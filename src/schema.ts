import { makeSchema } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';

import { Query, Mutation } from './resolvers';
import User from './resolvers/definitions/User';
import AuthPayload from './resolvers/definitions/AuthPayload';

export const schema = makeSchema({
  types: [Query, Mutation, User, AuthPayload],
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});
