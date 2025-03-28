import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prismadb?: PrismaClient };

const client = globalForPrisma.prismadb || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prismadb = client;
}

export default client;

// import { PrismaClient } from '@prisma/client';

// declare global {
//   // 使用 var 保持全局声明兼容性
//   var prisma: PrismaClient | undefined;
// }

// // 初始化 Prisma 客户端
// const prisma = globalThis.prisma || new PrismaClient({
//   log: process.env.NODE_ENV === 'development' 
//     ? ['query', 'error', 'warn'] 
//     : ['error']
// });

// // 开发环境下全局保存实例
// if (process.env.NODE_ENV !== 'production') {
//   globalThis.prisma = prisma;
// }

// export default prisma;