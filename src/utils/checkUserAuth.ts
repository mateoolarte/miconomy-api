import { throwError } from "./throwError";

export function checkUserAuth(user) {
  if (!user) {
    throwError("No has iniciado sesión", {
      code: "UNAUTHENTICATED",
    });
  }
}
