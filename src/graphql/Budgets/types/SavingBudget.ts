import { objectType } from 'nexus';

export const SavingBudget = objectType({
  name: 'SavingBudget',
  definition(t) {
    t.int('id');
    t.string('name');
    t.int('fee');
  },
});
