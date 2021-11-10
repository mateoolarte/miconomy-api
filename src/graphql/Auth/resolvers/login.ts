import bcrypt from 'bcrypt';
import { generateToken } from '../../../utils/generateToken';

export async function loginResolver(args, db) {
  const { email, password } = args;

  const user = await db.user.findUnique({ where: { email } });
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

  const token = generateToken({ userId: user.id }, '30 days');

  return {
    token,
    user,
    status: 202,
    message: 'El usuario ha ingresado correctamente',
  };
}