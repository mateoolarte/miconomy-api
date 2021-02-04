import { queryType, mutationType, objectType, nonNull, stringArg } from 'nexus';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';

const { APP_SECRET, SENDGRID_API_KEY, SENDGRID_EMAIL_SENDER } = process.env;

export interface AuthPayloadTypes {
  user: object;
  token: string;
}

export const AuthPayload = objectType({
  name: 'AuthPayload',
  sourceType: {
    module: __filename,
    export: 'AuthPayloadTypes',
  },
  definition(t) {
    t.field('user', {
      type: 'User',
      resolve({ user }) {
        return user;
      },
    });
    t.field('token', {
      type: nonNull('String'),
      resolve({ token }) {
        return token;
      },
    });
  },
});

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.password();
  },
});

export const ResetPasswordPayload = objectType({
  name: 'ResetPasswordPayload',
  definition(t) {
    t.field('status', {
      type: 'String',
      resolve({ status }: { status: string }) {
        return status;
      },
    });
    t.field('message', {
      type: 'String',
      resolve({ message }: { message: string }) {
        return message;
      },
    });
  },
});

export const UserQuery = queryType({
  definition(t) {
    t.crud.user();
  },
});

export const UserMutation = mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(root, { email, password }, { prisma }) {
        const pass = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: {
            email,
            password: pass,
          },
        });
        const token = jwt.sign(String(user.id), APP_SECRET || '');

        return {
          token,
          user,
        };
      },
    });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(root, { email, password }, { prisma }) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          throw new Error('Usuario no encontrado');
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error('Hubo un error en los datos ingresados');
        }

        const token = jwt.sign(String(user.id), APP_SECRET || '');

        return {
          token,
          user,
        };
      },
    });

    t.field('resetPassword', {
      type: 'ResetPasswordPayload',
      args: {
        email: nonNull(stringArg()),
      },
      async resolve(root, { email }, { prisma }) {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          return {
            status: 404,
            message: 'No se encontraron resultados',
          };
        }

        const token = jwt.sign(user.email, APP_SECRET || '');
        sgMail.setApiKey(SENDGRID_API_KEY);

        const msg = {
          to: email,
          from: SENDGRID_EMAIL_SENDER,
          subject: 'Miconomy: Solicitud cambio de contraseña',
          text: `Haz clic en el siguiente enlace para hacer el cambio de tu contraseña https://miconomy.co/update-password/${token}`,
          html: `Haz clic en el siguiente enlace para hacer el cambio de tu contraseña https://miconomy.co/update-password/${token}`,
        };

        try {
          const data = await sgMail.send(msg);
          const statusCode = data[0]?.statusCode;

          return {
            status: statusCode,
            message: `Solicitud enviada exitosamente, revisa la bandeja de entrada de tu correo electrónico: ${email}`,
          };
        } catch (error) {
          return {
            status: error.code,
            message: error.message,
          };
        }
      },
    });
    t.field('updatePassword', {
      type: 'ResetPasswordPayload',
      args: {
        password: nonNull(stringArg()),
        token: nonNull(stringArg()),
      },
      async resolve(root, { password, token }, { prisma }) {
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
          await prisma.user.update({
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
