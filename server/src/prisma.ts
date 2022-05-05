import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ['query'], // mostra as querys no console
});