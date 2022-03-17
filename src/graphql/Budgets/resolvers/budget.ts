import { checkUserAuth } from '../../../utils/checkUserAuth';

import { parseCategories } from '../utils/parseCategories';
import { parseSavings } from '../utils/parseSavings';

export async function budgetResolver(db, user, args) {
  checkUserAuth(user);

  const { id } = args;

  const getBudget = await db.budget.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      categories: true,
      savings: true,
    },
  });

  const getCategories = getBudget.categories;
  const getSavings = getBudget.savings;
  const categories = getCategories.map(async (item) =>
    parseCategories(item, db)
  );
  const savings = getSavings.map(async (item) => parseSavings(item, db));

  return {
    id: getBudget.id,
    name: getBudget.name,
    categories,
    savings,
  };
}
