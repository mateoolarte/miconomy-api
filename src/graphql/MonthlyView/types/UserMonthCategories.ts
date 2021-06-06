import { objectType } from 'nexus';

export const UserMonthCategories = objectType({
  name: 'UserMonthCategories',
  definition(t) {
    t.list.field('categories', {
      type: 'Category',
    });
  },
});
