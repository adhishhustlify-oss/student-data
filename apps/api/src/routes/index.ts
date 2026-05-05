import { FastifyInstance } from 'fastify';
import { batchRoutes } from './batch.js';
import { studentRoutes } from './student.js';
import { dashboardRoutes } from './dashboard.js';
export function registerRoutes(app: FastifyInstance) {
  app.get('/health', async () => ({ ok: true }));
  app.register(batchRoutes, { prefix: '/batches' });
  app.register(studentRoutes, { prefix: '/students' });
  app.register(dashboardRoutes, { prefix: '/dashboard' });
}
