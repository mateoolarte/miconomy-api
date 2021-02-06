import { makeSchema } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';

import * as types from './graphql';

export const schema = makeSchema({
  types,
  outputs: {
    typegen: __dirname + '/generated/nexus.ts',
    schema: __dirname + '/../schema.graphql',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});
