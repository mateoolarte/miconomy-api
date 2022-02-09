import { AuthenticationError } from 'apollo-server';

export function checkUserAuth(user) {
  if (!user) throw new AuthenticationError('No has iniciado sesión');
}
