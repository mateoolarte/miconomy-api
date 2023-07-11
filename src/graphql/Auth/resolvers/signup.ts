import bcrypt from "bcrypt";

import { generateToken } from "../../../utils/generateToken";
import { throwError } from "../../../utils/throwError";

export async function signupResolver(args, db) {
  const { email, password } = args;

  const userExist = await db.user.findUnique({ where: { email } });

  if (userExist) {
    throwError("Este usuario ya existe", {
      code: "BAD_USER_INPUT",
    });
  }

  if (password.length < 8) {
    throwError("La contraseña debe ser mayor o igual a 8 caracteres", {
      code: "BAD_USER_INPUT",
    });
  }

  const encryptedPass = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      email,
      password: encryptedPass,
    },
  });
  const token = generateToken({ userId: user.id }, "30 days");

  return {
    user,
    token,
  };
}
