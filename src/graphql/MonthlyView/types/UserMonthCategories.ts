import { objectType } from 'nexus';

export const UserMonthCategories = objectType({
  name: 'UserMonthCategories',
  definition(t) {
    t.int('id');
    t.list.field('categories', {
      type: 'Category',
    });
  },
});
