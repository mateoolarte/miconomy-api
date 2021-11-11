import { PrismaClient } from '@prisma/client';
import { db } from './db';
// import { checkAuth } from '../utils/checkAuth';

export interface Context {
  db: PrismaClient;
  userId: string | object;
}

export function createContext(req: object): Context {
  // const userId = checkAuth(req);

  return { db, userId: '' };
}
