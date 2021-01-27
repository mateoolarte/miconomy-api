import { objectType, nonNull, stringArg } from 'nexus';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { APP_SECRET } = process.env;

const Mutation = objectType({
  name: 'Mutation',
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
        const token = jwt.sign({ userId: user.id }, APP_SECRET || '');

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
          throw new Error('No such user found');
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error('Invalid password');
        }

        const token = jwt.sign({ userId: user.id }, APP_SECRET || '');

        return {
          token,
          user,
        };
      },
    });
  },
});

export default Mutation;
