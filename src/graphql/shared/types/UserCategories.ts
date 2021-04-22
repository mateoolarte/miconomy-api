import { objectType } from 'nexus';

export const UserCategories = objectType({
  name: 'UserCategories',
  definition(t) {
    t.int('status');
    t.string('error');
    t.list.field('categories', {
      type: 'Category',
    });
  },
});
