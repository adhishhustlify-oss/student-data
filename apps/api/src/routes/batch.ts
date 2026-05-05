import { FastifyInstance } from 'fastify';
import { paginationSchema } from '../schemas/common.js';

export async function batchRoutes(app: FastifyInstance) {
  app.get('/', async (req) => {
    const { page, pageSize } = paginationSchema.parse(req.query ?? {});
    const skip = (page - 1) * pageSize;
    const [items, total] = await Promise.all([
      app.prisma.batch.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: { select: { students: true } },
          students: { select: { paidAmount: true, totalFee: true } }
        }
      }),
      app.prisma.batch.count()
    ]);

    const mapped = items.map((b: any) => ({
      ...b,
      metrics: {
        totalStudents: b._count.students,
        totalRevenue: b.students.reduce((sum: number, s: any) => sum + s.paidAmount, 0),
        pendingAmount: b.students.reduce((sum: number, s: any) => sum + (s.totalFee - s.paidAmount), 0)
      }
    }));

    return { items: mapped, page, pageSize, total, totalPages: Math.ceil(total / pageSize) };
  });
}
