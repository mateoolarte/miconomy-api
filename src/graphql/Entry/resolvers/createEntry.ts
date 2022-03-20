import { UserInputError } from 'apollo-server';

import { checkUserAuth } from '../../../utils/checkUserAuth';

import { getMonth } from '../utils/getMonth';
import { getYear } from '../utils/getYear';
import { parseBudgetCategories } from '../../shared/utils/parseBudgetCategories';

export async function createEntryResolver(db, user, args) {
  checkUserAuth(user);

  const { month, year, budgetId } = args;

  const monthId = await getMonth(month, db);
  const yearId = await getYear(year, db);

  const searchEntryExist = await db.entry.findFirst({
    where: {
      monthId: monthId?.id,
      yearId: yearId?.id,
    },
  });

  if (searchEntryExist) {
    throw new UserInputError('Ya tienes creado este mes');
  }

  const entry = await db.entry.create({
    data: {
      monthId: monthId?.id,
      yearId: yearId?.id,
      userId: user?.userId,
    },
  });
  const getBudget = await db.budget.findUnique({
    where: {
      id: budgetId,
    },
    select: {
      categories: true,
    },
  });
  const getCategories = getBudget.categories;
  const categories = await Promise.all(
    getCategories.map(async (item) => await parseBudgetCategories(item, db))
  );
  const parseEntryCategories = categories.map((item) => {
    return {
      categoryId: item.id,
      amount: item.amount,
      entryId: entry.id,
    };
  });
  const entryCategories = categories.map((item) => {
    return {
      id: item.id,
      name: item.name,
      amount: item.amount,
      expenses: [],
    };
  });

  await db.entryCategory.createMany({
    data: parseEntryCategories,
  });

  const createdEntry = {
    id: entry.id,
    categories: entryCategories,
  };

  return createdEntry;
}
