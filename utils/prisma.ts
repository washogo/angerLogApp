import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
console.log(process.env.DATABASE_URL)
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
if (!process.env.DATABASE_URL) {
  throw new Error("Environment variable DATABASE_URL is not set");
}

export default prisma;