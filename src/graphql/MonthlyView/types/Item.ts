import { objectType } from 'nexus';

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.int('id');
    t.string('description');
    t.int('budget');
    t.list.field('expenses', {
      type: 'Expense',
    });
  },
});
