import bcrypt from 'bcrypt';
import { generateToken } from '../../../utils/generateToken';

export async function signupResolver(args, db) {
  const { email, password } = args;

  const userExist = await db.user.findUnique({ where: { email } });

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
  const user = await db.user.create({
    data: {
      email,
      password: pass,
    },
  });
  const token = generateToken({ userId: user.id }, '30 days');

  return {
    token,
    user,
    status: 202,
    message: 'Se ha creado el usuario correctamente',
  };
}
