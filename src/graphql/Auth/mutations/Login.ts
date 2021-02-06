import { nonNull, stringArg, extendType } from 'nexus';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { APP_SECRET } = process.env;

export const Login = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_root, { email, password }, { db }) {
        const user = await db.user.findUnique({ where: { email } });
        if (!user) {
          return {
            status: 404,
            message: 'Usuario no encontrado',
          };
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          return {
            status: 404,
            message: 'Hubo un error en los datos ingresados',
          };
        }

        const token = jwt.sign(String(user.id), APP_SECRET || '');

        return {
          token,
          user,
          status: 202,
          message: 'El usuario ha ingresado correctamente',
        };
      },
    });
  },
});