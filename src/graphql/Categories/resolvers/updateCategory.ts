import { AuthenticationError } from 'apollo-server';

export async function updateCategoryResolver(db, user, args) {
  if (!user) {
    throw new AuthenticationError('No has iniciado sesión');
  }

  const { id, name } = args;

  const updatedCategory = await db.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return updatedCategory;
}
