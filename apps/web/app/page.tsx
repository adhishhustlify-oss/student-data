'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { DashboardSkeleton } from '../components/dashboard-skeleton';

const DashboardCard = dynamic(
  () => import('../components/dashboard-card').then((m) => m.DashboardCard),
  { ssr: false }
);

const nav = ['Dashboard', 'Batches', 'Students', 'Payments', 'Refunds', 'Users'];
const cards = [
  { title: 'Total Students', hint: 'All active and transitioned learners' },
  { title: 'Total Batches', hint: 'Workshop and Full-Time combined' },
  { title: 'Live Batches', hint: 'Currently running schedules' },
  { title: 'Completed Batches', hint: 'Archived cohorts' },
  { title: 'Total Revenue', hint: 'Lifetime collection' },
  { title: 'Monthly Revenue', hint: 'Current month performance' },
  { title: 'Total Refunds', hint: 'All refund requests' },
  { title: 'Monthly Refunds', hint: 'Current month refund outflow' }
];

export default function Page() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  const navItems = useMemo(
    () =>
      nav.map((item, idx) => (
        <motion.div
          key={item}
          whileHover={{ x: 3 }}
          className={`rounded-xl px-3 py-2.5 text-sm font-medium transition ${
            idx === 0 ? 'bg-[rgba(59,130,246,0.15)] text-white' : 'text-[#B8C3D9] hover:bg-[rgba(99,102,241,0.12)]'
          }`}
        >
          {item}
        </motion.div>
      )),
    []
  );

  const metricCards = useMemo(
    () =>
      cards.map((card) => <DashboardCard key={card.title} title={card.title} value='—' hint={card.hint} />),
    []
  );

  return (
    <div className='min-h-screen bg-bg px-6 py-6 lg:px-10 lg:py-8'>
      <div className='mx-auto grid max-w-[1500px] grid-cols-12 gap-6'>
        <aside className='panel col-span-12 p-5 lg:col-span-3 xl:col-span-2'>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-highlight'>Hustlify Ops</p>
          <h1 className='mt-2 text-2xl font-semibold text-white'>Student System</h1>
          <nav className='mt-7 space-y-2'>{navItems}</nav>
        </aside>

        <main className='col-span-12 space-y-6 lg:col-span-9 xl:col-span-10'>
          <div className='panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.14em] subtle-text'>Internal Dashboard</p>
              <p className='mt-1 text-xl font-semibold text-white'>Operations Overview</p>
            </div>
            <div className='flex w-full gap-3 sm:w-auto'>
              <input className='w-full rounded-xl border border-[rgba(59,130,246,0.25)] bg-surface px-4 py-2.5 text-sm text-white outline-none transition focus:border-highlight focus:ring-2 focus:ring-[rgba(34,211,238,0.2)] sm:w-72' placeholder='Search students, batches, payments...' />
              <button className='rounded-xl border border-[rgba(99,102,241,0.35)] bg-[rgba(99,102,241,0.12)] px-4 py-2.5 text-sm font-medium text-white'>Profile</button>
            </div>
          </div>

          {loading ? <DashboardSkeleton /> : <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>{metricCards}</section>}
        </main>
      </div>
    </div>
  );
}
