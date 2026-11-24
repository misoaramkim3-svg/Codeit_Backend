import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("백엔드 .env에 DATABASE_URL을 설정하세요.");
}

const adapter = new PrismaPg({
  connectionString,
  connectionTimeoutMillis: 5000,
});
export const prisma = new PrismaClient({ adapter });
