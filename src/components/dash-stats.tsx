const stats = [
  { name: 'Title', stat: '250,000' },
  { name: 'Title', stat: '250,000' },
  { name: 'Title', stat: '250,000' },
];

export default function DashStats() {
  return (
    <div>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-3'>
        {stats.map((item) => (
          <div
            key={item.name}
            className='overflow-hidden px-4 py-5 sm:p-6 card2 uppercase'
          >
            <p className='truncate text-xs'>{item.name}</p>
            <p className='mt-1 text-3xl'>{item.stat}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
