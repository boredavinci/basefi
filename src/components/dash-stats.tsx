import { Badge } from '@/components/ui/badge';

const stats = [
  { name: 'Total invested', stat: '19,000' },
  { name: 'Portfolio value', stat: '21,129', percent: '+10%' },
  { name: 'Total investments', stat: '2' },
];

export default function DashStats() {
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
              <p className='mt-1 text-3xl'>{item.stat}</p>
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
