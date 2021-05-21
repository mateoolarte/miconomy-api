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

function getTotalBudget(aCategories, valCategories) {
  return (
    aCategories +
    valCategories.items.reduce((aItems, valItems) => {
      return aItems + valItems.itemBudget;
    }, 0)
  );
}

function getTotalSentSavings(accumulator, currentValue) {
  if (currentValue.sent) {
    accumulator += currentValue.value;
  }

  return accumulator;
}

function getTotalNotSentSavings(accumulator, currentValue) {
  if (!currentValue.sent) {
    accumulator += currentValue.value;
  }

  return accumulator;
}

function getTotalIncome(accumulator, currentValue) {
  return accumulator + currentValue.value;
}

function getLastExpense(result, currentValue) {
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
                      itemBudget: true,
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

          const categories = userMonth?.userMonthCategories;
          const totalExpenses = categories.reduce(getTotalExpenses, 0);
          const totalBudget = categories.reduce(getTotalBudget, 0);
          const totalSentSavings = userMonth?.userMonthSavingCategory?.userMonthSavingItems.reduce(
            getTotalSentSavings,
            0
          );
          const totalNotSentSavings = userMonth?.userMonthSavingCategory?.userMonthSavingItems.reduce(
            getTotalNotSentSavings,
            0
          );
          const totalIncome = userMonth?.incomes.reduce(getTotalIncome, 0);
          const available = totalIncome - totalExpenses - totalSentSavings;
          const lastExpense = categories.reduce(
            getLastExpense,
            categories[0]?.items[0]?.expense[0]
          );
          const notInBudget = totalIncome - totalBudget;

          if (!categories.length) {
            return {
              ...defaultResponse,
            };
          }

          if (categories.length) {
            return {
              ...defaultResponse,
              status: 200,
              incomes: userMonth?.incomes.slice(0, 3),
              available,
              lastExpense,
              notInBudget,
              savings: totalNotSentSavings,
            };
          }
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
