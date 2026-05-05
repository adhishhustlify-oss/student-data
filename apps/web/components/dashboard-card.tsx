'use client';

import { motion } from 'framer-motion';

export function DashboardCard({ title, value, hint }: { title: string; value: string; hint?: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 240, damping: 20 }}
      className='card p-5'
    >
      <div className='flex items-start justify-between gap-3'>
        <p className='text-sm font-medium subtle-text tracking-wide'>{title}</p>
        <span className='h-2 w-2 rounded-full bg-highlight shadow-[0_0_10px_#22D3EE]' />
      </div>
      <p className='mt-3 text-3xl font-semibold leading-none text-white'>{value}</p>
      {hint ? <p className='mt-3 text-xs subtle-text'>{hint}</p> : null}
    </motion.div>
  );
}
