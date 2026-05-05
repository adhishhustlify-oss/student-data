import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { paginationSchema } from '../schemas/common.js';
import { convertWorkshopStudent } from '../services/conversion.service.js';
import { moveStudentToRefund } from '../services/refund.service.js';

export async function studentRoutes(app: FastifyInstance) {
  app.get('/', async (req) => {
    const { page, pageSize } = paginationSchema.parse(req.query ?? {});
    const skip = (page - 1) * pageSize;
    const [items, total] = await Promise.all([
      app.prisma.student.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          phone: true,
          status: true,
          batchId: true,
          totalFee: true,
          paidAmount: true,
          createdAt: true,
          convertedAt: true,
          photo: true
        }
      }),
      app.prisma.student.count()
    ]);
    return { items, page, pageSize, total, totalPages: Math.ceil(total / pageSize) };
  });

  app.post('/:id/convert', async (req, reply) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    const body = z.object({ startDate: z.string().datetime().optional(), endDate: z.string().datetime().optional() }).parse(req.body ?? {});

    try {
      return await convertWorkshopStudent(app, id, {
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Conversion failed';
      return reply.status(message.includes('not found') ? 404 : 400).send({ message });
    }
  });

  app.post('/:id/refund', async (req, reply) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    try {
      await moveStudentToRefund(app, id);
      return { ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Refund transition failed';
      return reply.status(message.includes('not found') ? 404 : 400).send({ message });
    }
  });
}
