import { queryType } from 'nexus';

const Query = queryType({
  definition(t) {
    t.crud.user();
  },
});

export default Query;
