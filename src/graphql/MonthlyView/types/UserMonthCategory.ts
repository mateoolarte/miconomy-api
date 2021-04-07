import { objectType } from 'nexus';

export const UserMonthCategory = objectType({
  name: 'UserMonthCategory',
  definition(t) {
    t.int('id');
    t.field('category', {
      type: 'Category',
    });
    t.list.field('items', {
      type: 'Item',
    });
  },
});
