import { checkUserAuth } from '../../../utils/checkUserAuth';

import { parseCategories } from '../utils/parseCategories';
import { parseSavings } from '../utils/parseSavings';

export async function createBudgetResolver(db, user, args) {
  checkUserAuth(user);

  const { name } = args;

  const createdBudget = await db.budget.create({
    data: {
      userId: user?.userId,
      name,
    },
    select: {
      id: true,
      name: true,
      categories: true,
      savings: true,
    },
  });
  const getCategories = createdBudget.categories;
  const getSavings = createdBudget.savings;
  const categories = getCategories.map(async (item) =>
    parseCategories(item, db)
  );
  const savings = getSavings.map(async (item) => parseSavings(item, db));
  const budget = {
    id: createdBudget.id,
    name: createdBudget.name,
    categories,
    savings,
  };

  return budget;
}
