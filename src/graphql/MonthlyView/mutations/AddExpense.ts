import { nonNull, extendType, intArg, stringArg } from 'nexus';

import { checkAuth } from '../../../utils/checkAuth';

export const AddExpense = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addExpense', {
      type: 'Expense',
      args: {
        itemId: nonNull(intArg()),
        value: nonNull(intArg()),
        description: nonNull(stringArg()),
      },
      async resolve(_root, { itemId, value, description }, { db, req }) {
        checkAuth(req);

        try {
          const expenseAdded = await db.expense.create({
            data: {
              itemId,
              description,
              value,
              date: new Date(),
            },
          });

          return {
            id: expenseAdded.id,
            value: expenseAdded.value,
          };
        } catch (error) {
          return {
            id: null,
            value: null,
          };
        }
      },
    });
  },
});
