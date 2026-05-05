# Hustlify Student & Batch Management System

Production-focused monorepo with Next.js web + Fastify API + Prisma/SQLite.

## Stack
- `apps/web`: Next.js App Router + TypeScript + Tailwind + Framer Motion
- `apps/api`: Fastify + Zod + modular routes/services-ready
- `packages/db`: Prisma schema/client for SQLite at `/data/hustlify.db`

## Quick start
1. `cp .env.example .env`
2. `npm install`
3. `npx prisma migrate dev --schema packages/db/prisma/schema.prisma --name init`
4. `npm run db:seed`
5. `npm run dev`

## Core implemented flows
- Batch-centric student model with mandatory `batchId`.
- Workshop-only initial status and strict outcomes (`FULL_TIME` conversion or `REFUND`).
- Conversion automation: auto-create or reuse a single FULL_TIME batch linked by `parentBatchId`.
- Refund automation: mark student refund + create refund record in one transaction.
- Dashboard summary endpoint for operations metrics.

