import { makeSchema } from 'nexus';
import * as types from '.';

export const schema = makeSchema({
  types,
  outputs: {
    typegen: __dirname + '/../libs/generated/nexus.ts',
    schema: __dirname + '/../../schema.graphql',
  },
  contextType: {
    module: require.resolve('../config/context'),
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
