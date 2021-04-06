import { objectType } from 'nexus';

export const OverviewMonthPayload = objectType({
  name: 'OverviewMonthPayload',
  definition(t) {
    t.list.field('incomes', {
      type: 'Income',
    });
    t.int('available');
    t.nullable.int('notInBudget');
    t.nullable.int('savings');
  },
});
