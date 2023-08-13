import Image from 'next/image';
import Link from 'next/link';

import Status from '@/components/status';
import { FundStage } from '@/service/fund';

const deals = [
  {
    name: ' Water Lily Pond',
    artist: 'Claude Monet',
    date: 'June 2016',
    juniorapy: '18,729',
    seniorapy: '17,000',
    logoUrl: '/water-lily-pond-harmony-in-green.jpg',
    url: 'water-lily-pond-harmony-in-green',
  },
  {
    name: 'Bal du moulin',
    artist: 'Pierre Renoir',
    date: 'March 2017',
    juniorapy: '13,212',
    seniorapy: '12,000',
    logoUrl: '/bal-du-moulin.jpg',
    url: 'bal-du-moulin',
  },
];

export default function MyDeal() {
  return (
    <ul
      role='list'
      className='mx-auto grid max-w-2xl grid-cols-1 gap-6  sm:grid-cols-2 lg:grid-cols-3 lg:mx-0 lg:max-w-none lg:gap-8 text-center grid-flow-row-dense'
    >
      {deals.map((deal) => (
        <Link
          key={deal.name}
          className='rounded-3xl px-6 py-8 shadow-2xl  shadow-fuchsia-200 h-fit card relative'
          href={deal.url}
        >
          <div className='absolute shadow-2xl top-10 right-6'>
            <Status stage={FundStage.FUNDING} />
          </div>

          <Image
            className='mx-auto w-full rounded-3xl 24 h-60 object-cover'
            src={deal.logoUrl}
            width={400}
            height={400}
            alt={deal.name}
          />
          <h2 className='mt-6 text-2xl'>{deal.name}</h2>
          <div className='flex pt-4 justify-between'>
            <div className='text-left uppercase'>
              <p className='text-sm'>Invested</p>
              <p className='mt-1 text-2xl'>{deal.seniorapy}</p>
            </div>
            <div className=' text-left uppercase'>
              <p className='text-xs '>Current value</p>
              <p className='mt-1 text-2xl '>{deal.juniorapy}</p>
            </div>
          </div>
        </Link>
      ))}
    </ul>
  );
}
