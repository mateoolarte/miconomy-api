import { objectType, nonNull, stringArg, extendType } from 'nexus';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';

const { APP_SECRET, SENDGRID_API_KEY, SENDGRID_EMAIL_SENDER } = process.env;

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id');
    t.string('name');
    t.string('email');
    t.string('password');
  },
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.field('user', {
      type: 'User',
    });
    t.string('token');
    t.int('status');
    t.string('message');
  },
});

export const ResetPasswordPayload = objectType({
  name: 'ResetPasswordPayload',
  definition(t) {
    t.string('status');
    t.string('message');
  },
});

export const Signup = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('signup', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_root, { email, password }, { prisma }) {
        const userExist = await prisma.user.findUnique({ where: { email } });

        if (userExist) {
          return {
            status: 404,
            message: 'Este usuario ya existe',
          };
        }

        if (password.length < 8) {
          return {
            status: 404,
            message: 'La contraseña debe ser mayor o igual a 8 caracteres',
          };
        }

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
          status: 202,
          message: 'Se ha creado el usuario correctamente',
        };
      },
    });
  },
});

export const Login = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_root, { email, password }, { prisma }) {
        const user = await prisma.user.findUnique({ where: { email } });
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

export const ResetPassword = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('resetPassword', {
      type: 'ResetPasswordPayload',
      args: {
        email: nonNull(stringArg()),
      },
      async resolve(_root, { email }, { prisma }) {
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
          from: `Miconomy <${SENDGRID_EMAIL_SENDER}>`,
          subject: 'Solicitud cambio de contraseña',
          text: `Haz clic en el siguiente enlace para hacer el cambio de tu contraseña https://miconomy.co/update-password/${token}`,
          html: `Haz clic en el siguiente enlace para hacer el cambio de tu contraseña <a href="https://miconomy.co/update-password/${token}">Cambio de contraseña</a>`,
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
  },
});

export const UpdatePassword = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updatePassword', {
      type: 'ResetPasswordPayload',
      args: {
        password: nonNull(stringArg()),
        token: nonNull(stringArg()),
      },
      async resolve(_root, { password, token }, { prisma }) {
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
