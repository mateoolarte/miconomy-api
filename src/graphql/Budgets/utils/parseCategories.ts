import { getCategory } from './getCategory';

export async function parseCategories(item, db) {
  const categoryId = item.categoryId;
  const categoryAmount = item.amount;
  const category = await getCategory(categoryId, db);

  return {
    ...category,
    amount: categoryAmount,
  };
}
