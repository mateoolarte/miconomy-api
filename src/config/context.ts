import { PrismaClient } from '@prisma/client';
import { db } from './db';
import { checkUserAuth } from '../utils/checkUserAuth';

export interface Context {
  db: PrismaClient;
  user: string | object;
}

export function createContext(req: object): Context {
  const user = checkUserAuth(req);

  return { db, user };
}
