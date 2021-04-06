import jwt from 'jsonwebtoken';

export function checkAuth(req): string | object {
  const authorizationHeader = req.headers.authorization || '';

  if (!authorizationHeader)
    throw new Error('Debes estar registrado para ver esta sección');

  const token = authorizationHeader.replace('Bearer ', '');

  try {
    return jwt.verify(token, process.env.APP_SECRET);
  } catch (error) {
    throw new Error('El token ingresado no es válido');
  }
}
