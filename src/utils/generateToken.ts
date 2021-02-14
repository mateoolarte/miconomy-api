import jwt from 'jsonwebtoken';

export function generateToken(
  value: string | object,
  expiresIn: string
): string {
  return jwt.sign(value, process.env.APP_SECRET, {
    expiresIn,
  });
}
