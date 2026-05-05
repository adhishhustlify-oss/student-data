export function DashboardSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className='card animate-pulse p-5'>
          <div className='h-4 w-28 rounded bg-[rgba(99,102,241,0.24)]' />
          <div className='mt-4 h-8 w-20 rounded bg-[rgba(59,130,246,0.24)]' />
          <div className='mt-4 h-3 w-36 rounded bg-[rgba(34,211,238,0.2)]' />
        </div>
      ))}
    </div>
  );
}
