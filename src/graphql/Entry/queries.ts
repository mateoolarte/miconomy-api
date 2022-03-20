import { queryField, nonNull } from 'nexus';
import { Entry } from './resolvers';

export const entry = queryField('entry', {
  type: nonNull('Entry'),
  args: {
    month: nonNull('Int'),
    year: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Entry.getEntry(db, user, args);
  },
});
