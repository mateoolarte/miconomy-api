import { objectType } from 'nexus';

export const UserMonthSavingCategory = objectType({
  name: 'UserMonthSavingCategory',
  definition(t) {
    t.int('id');
    t.list.field('savingItems', {
      type: 'UserMonthSavingItem',
    });
  },
});
