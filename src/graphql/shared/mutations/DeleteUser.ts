import { nonNull, stringArg, extendType } from 'nexus';
import jwt from 'jsonwebtoken';

const { APP_SECRET } = process.env;

export const DeleteUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteUser', {
      type: 'DeleteUserPayload',
      args: {
        token: nonNull(stringArg()),
      },
      async resolve(_root, { token }, { db }) {
        const email: any = jwt.verify(token, APP_SECRET);
        if (!email) {
          return {
            status: 404,
            message: 'Invalid Token',
          };
        }
        try {
          await db.user.delete({ where: { id: email.userId } });

          return {
            status: 202,
            message: 'User deleted succesfully',
          };
        } catch (error) {
          return {
            status: error.code,
            message: 'Something went wrong',
          };
        }
      },
    });
  },
});
