import { FastifyInstance } from 'fastify';

export async function moveStudentToRefund(app: FastifyInstance, studentId: string) {
  const student = await app.prisma.student.findUnique({ where: { id: studentId } });
  if (!student) throw new Error('Student not found');
  if (student.status !== 'WORKSHOP') throw new Error('Student already processed');

  return app.prisma.$transaction([
    app.prisma.student.update({ where: { id: studentId }, data: { status: 'REFUND' } }),
    app.prisma.refund.create({ data: { studentId, amount: student.paidAmount, status: 'PENDING' } })
  ]);
}
