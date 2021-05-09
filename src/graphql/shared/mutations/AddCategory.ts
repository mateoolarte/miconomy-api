import { nonNull, extendType, stringArg } from 'nexus';

import { checkAuth } from '../../../utils/checkAuth';

export const AddCategory = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addCategory', {
      type: 'Category',
      args: {
        name: nonNull(stringArg()),
      },
      async resolve(_root, { name }, { db, req }) {
        const user: any = checkAuth(req);
        const { userId } = user;

        const defaultResponse = {
          id: null,
          name: '',
          isActive: false,
        };

        try {
          const addedCategory = await db.category.create({
            data: {
              name,
              userId,
              isActive: true,
            },
          });

          return {
            id: addedCategory?.id,
            name: addedCategory?.name,
            isActive: addedCategory?.isActive,
          };
        } catch (error) {
          return defaultResponse;
        }
      },
    });
  },
});
