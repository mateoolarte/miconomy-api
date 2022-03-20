import { entryResolver } from './entry';
import { createCategoryEntryResolver } from './createCategoryEntry';
import { createEntryResolver } from './createEntry';
import { createIncomeResolver } from './createIncome';
import { createExpenseResolver } from './createExpense';

export const Entry = {
  getEntry: entryResolver,
  createCategoryEntry: createCategoryEntryResolver,
  createEntry: createEntryResolver,
  createIncome: createIncomeResolver,
  createExpense: createExpenseResolver,
};
