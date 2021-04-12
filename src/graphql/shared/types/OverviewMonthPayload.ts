import { objectType } from 'nexus';

export const OverviewMonthPayload = objectType({
  name: 'OverviewMonthPayload',
  definition(t) {
    t.int('status');
    t.string('error');
    t.list.field('incomes', {
      type: 'Income',
    });
    t.int('available');
    t.string('lastExpense');
    t.nullable.int('notInBudget');
    t.nullable.int('savings');
  },
});
