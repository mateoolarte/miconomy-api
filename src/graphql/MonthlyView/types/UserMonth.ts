import { objectType } from 'nexus';

export const UserMonth = objectType({
  name: 'UserMonth',
  definition(t) {
    t.int('id');
    t.int('value');
    t.list.field('categories', {
      type: 'UserMonthCategory',
    });
    t.list.field('savingCategories', {
      type: 'UserMonthSavingCategory',
    });
  },
});
