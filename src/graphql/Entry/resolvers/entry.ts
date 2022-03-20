import { checkUserAuth } from '../../../utils/checkUserAuth';

import { parseEntryCategories } from '../utils/parseEntryCategories';
import { getMonth } from '../utils/getMonth';
import { getYear } from '../utils/getYear';

export async function entryResolver(db, user, args) {
  checkUserAuth(user);

  const { month, year } = args;

  const monthId = await getMonth(month, db);
  const yearId = await getYear(year, db);

  const getEntry = await db.entry.findFirst({
    where: {
      monthId: monthId?.id,
      yearId: yearId?.id,
      userId: user?.userId,
    },
    select: {
      id: true,
      categories: true,
    },
  });

  if (!getEntry?.id) {
    return {
      id: null,
      categories: [],
    };
  }

  const getCategories = getEntry.categories;
  const categories = getCategories.map(async (item) =>
    parseEntryCategories(item, getEntry.id, db)
  );

  return {
    id: getEntry.id,
    categories,
  };
}
