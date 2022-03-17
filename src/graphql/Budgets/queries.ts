import { queryField, list, nonNull } from 'nexus';
import { Budget } from './resolvers';

export const budgets = queryField('budgets', {
  type: list(nonNull('Budget')),
  async resolve(_root, _, { db, user }) {
    return Budget.getBudgets(db, user);
  },
});
