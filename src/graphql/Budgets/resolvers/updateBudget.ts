import { checkUserAuth } from '../../../utils/checkUserAuth';

import { parseBudgetCategories } from '../../shared/utils/parseBudgetCategories';
import { parseSavings } from '../utils/parseSavings';

export async function updateBudgetResolver(db, user, args) {
  checkUserAuth(user);

  const { id, name } = args;

  const updatedBudget = await db.budget.update({
    where: {
      id,
    },
    data: {
      name,
    },
    select: {
      id: true,
      name: true,
      categories: true,
      savings: true,
    },
  });
  const getCategories = updatedBudget.categories;
  const getSavings = updatedBudget.savings;
  const categories = getCategories.map(async (item) =>
    parseBudgetCategories(item, db)
  );
  const savings = getSavings.map(async (item) => parseSavings(item, db));
  const budget = {
    id: updatedBudget.id,
    name: updatedBudget.name,
    categories,
    savings,
  };

  return budget;
}
