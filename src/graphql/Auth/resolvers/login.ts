import bcrypt from "bcrypt";

import { generateToken } from "../../../utils/generateToken";
import { throwError } from "../../../utils/throwError";

export async function loginResolver(args, db) {
  const { email, password } = args;

  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    throwError("Este usuario no existe", {
      code: "BAD_USER_INPUT",
    });
  }

  const hasValidPassword = await bcrypt.compare(password, user.password);

  if (!hasValidPassword) {
    throwError("Valida tu usuario o contraseña", {
      code: "BAD_USER_INPUT",
    });
  }

  const token = generateToken({ userId: user.id }, "30 days");

  return {
    user,
    token,
  };
}
