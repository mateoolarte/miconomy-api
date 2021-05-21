import { objectType } from 'nexus';

export const UserMonth = objectType({
  name: 'UserMonth',
  definition(t) {
    t.int('id');
    t.int('status');
    t.string('error');
    t.list.field('categories', {
      type: 'UserMonthCategory',
    });
    t.field('savingCategories', {
      type: 'UserMonthSavingCategory',
    });
  },
});
