export default function ProductSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className='rounded-box border border-base-300 bg-base-100 p-4'
        >
          <div className='skeleton h-10 w-10'></div>
          <div className='skeleton mt-3 h-5 w-3/4'></div>
          <div className='skeleton mt-2 h-4 w-1/3'></div>
          <div className='mt-4 flex items-end justify-between border-t border-base-300 pt-3'>
            <div className='skeleton h-8 w-24'></div>
            <div className='skeleton h-6 w-14'></div>
          </div>
        </div>
      ))}
    </div>
  );
}
