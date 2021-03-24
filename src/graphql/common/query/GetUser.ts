import { nonNull, stringArg, extendType } from 'nexus';
import jwt from 'jsonwebtoken';
const { APP_SECRET } = process.env;

export const GetUser = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getUser', {
      type: 'User',
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
          const user = await db.user.findUnique({
            where: { id: email.userId },
          });
          if (user.email) {
            return {
              ...user,
              status: 202,
              message: 'User found succesfully',
            };
          } else {
            return {
              status: 404,
              message: 'Something went wrong',
            };
          }
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
