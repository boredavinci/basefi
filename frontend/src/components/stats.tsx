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
];

export default function Stats() {
  return (
    <div className='mx-auto grid grid-cols-1 sm:grid-cols-3 card2 mt-6'>
      {stats.map((stat) => (
        <div key={stat.name} className='px-4 py-10 '>
          <p className='text-sm uppercase font-semibold'>{stat.name}</p>
          <p className=' text-3xl font-bold'>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
