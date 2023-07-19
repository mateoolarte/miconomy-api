import { checkUserAuth } from "../../../utils/checkUserAuth";
import { throwError } from "../../../utils/throwError";

import { parseBudgetCategories } from "../../shared/utils/parseBudgetCategories";
import { parseBudgetSavings } from "../../shared/utils/parseBudgetSavings";

export async function createBudgetResolver(db, user, args) {
  checkUserAuth(user);

  const { name } = args;

  const budgetExist = await db.budget.findUnique({ where: { name } });

  if (budgetExist) {
    throwError("Ya tienes un presupuesto creado con este nombre", {
      code: "BAD_USER_INPUT",
    });
  }

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
    parseBudgetCategories(item, db),
  );
  const savings = getSavings.map(async (item) => parseBudgetSavings(item, db));
  const budget = {
    id: createdBudget.id,
    name: createdBudget.name,
    categories,
    savings,
  };

  return budget;
}
