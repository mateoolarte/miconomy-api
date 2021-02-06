import { objectType } from 'nexus';

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
