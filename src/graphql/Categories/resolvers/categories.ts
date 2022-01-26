import { AuthenticationError } from 'apollo-server';

export async function categoriesResolver(db, user) {
  if (!user) {
    throw new AuthenticationError('No has iniciado sesión');
  }

  const categories = await db.category.findMany({
    where: {
      userId: user?.userId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return categories;
}
