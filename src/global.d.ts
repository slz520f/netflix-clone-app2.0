
import { PrismaClient } from '@prisma/client';
declare const prisma: PrismaClient;


declare global {
  const prisma: import('@prisma/client').PrismaClient | undefined;
}