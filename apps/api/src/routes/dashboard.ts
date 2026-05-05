import { FastifyInstance } from 'fastify';

export async function dashboardRoutes(app: FastifyInstance) {
  app.get('/summary', async () => {
    const now = new Date();
    const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

    const [
      totalStudents,
      batchCounts,
      totalRevenue,
      monthlyRevenue,
      totalRefunds,
      monthlyRefunds
    ] = await Promise.all([
      app.prisma.student.count(),
      app.prisma.batch.groupBy({ by: ['status'], _count: { _all: true } }),
      app.prisma.payment.aggregate({ _sum: { amount: true } }),
      app.prisma.payment.aggregate({ where: { date: { gte: monthStart } }, _sum: { amount: true } }),
      app.prisma.refund.aggregate({ _sum: { amount: true } }),
      app.prisma.refund.aggregate({ where: { createdAt: { gte: monthStart } }, _sum: { amount: true } })
    ]);

    const liveBatches = batchCounts.find((b: any) => b.status === 'LIVE')?._count._all ?? 0;
    const completedBatches = batchCounts.find((b: any) => b.status === 'COMPLETED')?._count._all ?? 0;
    const totalBatches = batchCounts.reduce((sum: number, row: any) => sum + row._count._all, 0);

    return {
      totalStudents,
      totalBatches,
      liveBatches,
      completedBatches,
      totalRevenue: totalRevenue._sum.amount ?? 0,
      monthlyRevenue: monthlyRevenue._sum.amount ?? 0,
      totalRefunds: totalRefunds._sum.amount ?? 0,
      monthlyRefunds: monthlyRefunds._sum.amount ?? 0
    };
  });
}
