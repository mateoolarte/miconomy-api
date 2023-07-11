import jwt from "jsonwebtoken";

import { throwError } from "./throwError";

export function checkUserToken(req) {
  const authorizationHeader = req.headers.authorization || "";

  if (!authorizationHeader) return null;

  try {
    const token = authorizationHeader.replace("Bearer ", "");
    const verifiedToken = jwt.verify(token, process.env.APP_SECRET);

    return verifiedToken;
  } catch (error) {
    throwError("El token ingresado no es válido", {
      code: "UNAUTHENTICATED",
      http: { status: 401 },
    });
  }
}
