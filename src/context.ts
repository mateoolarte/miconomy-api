import { PrismaClient } from '@prisma/client';
import { db } from './db';

export interface Context {
  db: PrismaClient;
  req: object;
}

export function createContext(req: object): Context {
  return { db, req };
}
