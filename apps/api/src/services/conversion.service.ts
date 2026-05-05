import { FastifyInstance } from 'fastify';

export async function convertWorkshopStudent(app: FastifyInstance, studentId: string, config?: {startDate?: Date; endDate?: Date}) {
  return app.prisma.$transaction(async (tx: any) => {
    const student = await tx.student.findUnique({ where: { id: studentId }, include: { batch: true } });
    if (!student) throw new Error('Student not found');
    if (student.status !== 'WORKSHOP') throw new Error('Student already processed');

    const workshopId = student.batchId;
    let fullTimeBatch = await tx.batch.findFirst({ where: { parentBatchId: workshopId, type: 'FULL_TIME' } });

    if (!fullTimeBatch) {
      fullTimeBatch = await tx.batch.create({
        data: {
          name: `FT-${student.batch.name}`,
          type: 'FULL_TIME',
          status: 'UPCOMING',
          startDate: config?.startDate ?? new Date(),
          endDate: config?.endDate ?? new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
          parentBatchId: workshopId
        }
      });
    }

    const updated = await tx.student.update({ where: { id: studentId }, data: { status: 'FULL_TIME', batchId: fullTimeBatch.id, convertedAt: new Date() } });
    return { student: updated, fullTimeBatch };
  });
}
