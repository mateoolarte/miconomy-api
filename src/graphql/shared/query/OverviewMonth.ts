import { nonNull, stringArg, extendType } from 'nexus';

import { checkAuth } from '../../../utils/checkAuth';

function getTotalExpenses(aCategories, valCategories) {
  return (
    aCategories +
    valCategories.items.reduce((aItems, valItems) => {
      return (
        aItems +
        valItems.expense.reduce((aExpenses, valExpenses) => {
          return aExpenses + valExpenses.value;
        }, 0)
      );
    }, 0)
  );
}

function getTotalSentSavings(accumulator, currentValue) {
  if (currentValue.sent) {
    accumulator += currentValue.value;
  }

  return accumulator;
}

function getTotalIncome(accumulator, currentValue) {
  return accumulator + currentValue.value;
}

function getLastExpense(result, currentValue) {
  result = currentValue.items[0].expense[0];

  currentValue.items.forEach(valItem => {
    valItem.expense.forEach(valExpense => {
      if (result.date < valExpense.date) {
        result = valExpense;
      }
    });
  });

  return result;
}

export const OverviewMonth = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('overviewMonth', {
      type: 'OverviewMonthPayload',
      args: {
        month: nonNull(stringArg()),
      },
      async resolve(_root, { month }, { db, req }) {
        const user: any = checkAuth(req);
        const { userId } = user;

        const defaultResponse = {
          error: null,
          status: 500,
          incomes: [],
          available: 0,
          lastExpense: {},
          notInBudget: 0,
          savings: 0,
        };

        try {
          const userMonth = await db.userMonth.findFirst({
            where: {
              month: {
                date: month,
              },
              userId,
            },
            include: {
              incomes: true,
              userMonthCategories: {
                include: {
                  items: {
                    select: {
                      expense: true,
                    },
                  },
                },
              },
              userMonthSavingCategory: {
                include: {
                  userMonthSavingItems: true,
                },
              },
            },
          });
          const totalExpenses = userMonth?.userMonthCategories.reduce(
            getTotalExpenses,
            0
          );
          const totalSentSavings = userMonth?.userMonthSavingCategory.userMonthSavingItems.reduce(
            getTotalSentSavings,
            0
          );
          const totalIncome = userMonth?.incomes.reduce(getTotalIncome, 0);
          const available = totalIncome - totalExpenses - totalSentSavings;
          const lastExpense = userMonth?.userMonthCategories.reduce(
            getLastExpense,
            ''
          );

          return {
            ...defaultResponse,
            status: 200,
            incomes: userMonth?.incomes,
            available,
            lastExpense,
            notInBudget: 0, // TBD
            savings: 0, // TBD
          };
        } catch (error) {
          return {
            ...defaultResponse,
            error,
          };
        }
      },
    });
  },
});
