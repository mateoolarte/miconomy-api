import { objectType, nonNull } from 'nexus';

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

export default AuthPayload;
