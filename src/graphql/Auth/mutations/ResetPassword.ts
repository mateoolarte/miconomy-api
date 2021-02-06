import { nonNull, stringArg, extendType } from 'nexus';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';

const { APP_SECRET, SENDGRID_API_KEY, SENDGRID_EMAIL_SENDER } = process.env;

export const ResetPassword = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('resetPassword', {
      type: 'ResetPasswordPayload',
      args: {
        email: nonNull(stringArg()),
      },
      async resolve(_root, { email }, { db }) {
        const user = await db.user.findUnique({ where: { email } });

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
