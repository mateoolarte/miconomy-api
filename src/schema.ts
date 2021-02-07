import { makeSchema } from 'nexus';

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
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});
