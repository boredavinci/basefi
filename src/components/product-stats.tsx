const stats = [
  {
    name: 'Last sold',
    value: '$79,500,000',
  },
  {
    name: ' Last sold date',
    value: 'Sep 2018',
  },
  {
    name: 'Artist name',
    value: 'Claude Monet',
  },
  {
    name: 'year painted',
    value: '1897',
  },
];

export default function ProductStats() {
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12 '>
      {stats.map((stat) => (
        <div key={stat.name} className='text-left uppercase'>
          <p className='text-xs'>{stat.name}</p>
          <p className='text-2xl mt-1'>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
