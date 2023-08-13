export default function ProductStats({
  totalValue,
  artistName,
}: {
  totalValue: string;
  artistName: string;
}) {
  const stats = [
    {
      name: ' Last sold date',
      value: 'Sep 2018',
    },
    {
      name: 'Artist name',
      value: artistName,
    },
    {
      name: 'year painted',
      value: '1897',
    },
  ];
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12 '>
      <div key='totalvalue' className='text-left uppercase'>
        <p className='text-xs'>Total Value</p>
        <p className='text-2xl mt-1'>{totalValue}</p>
      </div>
      {stats.map((stat) => (
        <div key={stat.name} className='text-left uppercase'>
          <p className='text-xs'>{stat.name}</p>
          <p className='text-2xl mt-1'>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
