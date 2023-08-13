import { formatEther } from 'viem';

import { Badge } from '@/components/ui/badge';

import { FundInvestments } from '@/service/fund';

export default function DashStats({
  fundInvestments,
}: {
  fundInvestments?: FundInvestments;
}) {
  const stats = [
    {
      name: 'Total invested',
      stat: Number(
        formatEther(
          fundInvestments?.reduce((acc, x) => acc + x.amount!, 0n) || 0n
        )
      ).toFixed(2),
    },
    { name: 'Portfolio value', stat: '21,129', percent: '+10%' },
    { name: 'Total investments', stat: fundInvestments?.length },
  ];

  return (
    <div>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-3'>
        {stats.map((item) => (
          <div
            key={item.name}
            className='flex overflow-hidden px-4 py-5 sm:p-6 card2 uppercase justify-between'
          >
            <div>
              <p className='text-xs'>{item.name}</p>
              <p className='mt-1 text-3xl'>{item.stat?.toString()}</p>
            </div>
            <div>
              {item.percent && (
                <Badge variant='outline'>
                  <p className='text-green-600'>{item.percent}</p>
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
