import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({ where: { email: 'admin@hustlify.local' }, update: {}, create: { name: 'Super Admin', email: 'admin@hustlify.local', role: 'SUPER_ADMIN' } });
}
main().finally(() => prisma.$disconnect());
