
// import { PrismaClient } from '@prisma/client';
// declare const prisma: PrismaClient;


// declare global {
//   const prisma: import('@prisma/client').PrismaClient | undefined;
// }
import { PrismaClient } from '@prisma/client';

declare global {
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient;
    }
  }
}

export {};