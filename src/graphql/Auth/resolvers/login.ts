import { UserInputError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { generateToken } from '../../../utils/generateToken';

export async function loginResolver(args, db) {
  const { email, password } = args;

  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    throw new UserInputError('Este usuario no existe');
  }

  const hasValidPassword = await bcrypt.compare(password, user.password);

  if (!hasValidPassword) {
    throw new UserInputError('Valida tu usuario o contraseña');
  }

  const token = generateToken({ userId: user.id }, '30 days');

  return {
    user,
    token,
  };
}
