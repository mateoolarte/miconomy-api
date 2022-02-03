import { AuthenticationError } from 'apollo-server';

export async function createCategoryResolver(db, user, args) {
  if (!user) {
    throw new AuthenticationError('No has iniciado sesión');
  }

  const { name } = args;

  const createdCategory = await db.category.create({
    data: {
      name,
      userId: user?.userId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return createdCategory;
}
