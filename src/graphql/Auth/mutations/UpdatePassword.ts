import { nonNull, stringArg, extendType } from 'nexus';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { APP_SECRET } = process.env;

export const UpdatePassword = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updatePassword', {
      type: 'ResetPasswordPayload',
      args: {
        password: nonNull(stringArg()),
        token: nonNull(stringArg()),
      },
      async resolve(_root, { password, token }, { db }) {
        const userEmail: any = jwt.verify(token, APP_SECRET);

        if (!userEmail) {
          return {
            status: 404,
            message:
              'El token es incorrecto, verifica el enlace en tu correo electrónico',
          };
        }

        try {
          const updatedPassword = await bcrypt.hash(password, 10);
          await db.user.update({
            where: { email: userEmail },
            data: { password: updatedPassword },
          });

          return {
            status: 202,
            message: 'Su contraseña ha sido actualizada exitosamente',
          };
        } catch (error) {
          return {
            status: error.code,
            message: 'No pudimos actualizar tu contraseña',
          };
        }
      },
    });
  },
});
