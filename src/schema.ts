import { makeSchema, objectType, queryType, nonNull, stringArg } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.password();
  },
});

export interface AuthPayloadTypes {
  user: object;
  token: string;
}

const AuthPayload = objectType({
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

const Query = queryType({
  definition(t) {
    t.crud.user();
  },
});

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
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

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

        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

        return {
          token,
          user,
        };
      },
    });
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, User, AuthPayload],
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});
