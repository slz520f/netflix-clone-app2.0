// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prismadb?: PrismaClient };

// const client = globalForPrisma.prismadb || new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//     globalForPrisma.prismadb = client;
// }

// export default client;

// src/lib/prismadb.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prismadb = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prismadb;
}

export default prismadb;
