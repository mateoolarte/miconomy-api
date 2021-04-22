import { objectType } from 'nexus';

export const Expense = objectType({
  name: 'Expense',
  definition(t) {
    t.int('id');
    t.int('value');
    t.string('description');
  },
});
