const stats = [
  {
    name: 'Total Value Locked',
    value: '35,000,000',
  },
  {
    name: 'Total Value Locked',
    value: '35,000,000',
  },
  {
    name: 'Total Value Locked',
    value: '35,000,000',
  },
  {
    name: 'Total Value Locked',
    value: '35,000,000',
  },
];

export default function ProductStats() {
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12 '>
      {stats.map((stat) => (
        <div key={stat.name} className='text-left uppercase'>
          <p className='text-xs'>{stat.name}</p>
          <p className='text-3xl mt-1'>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
