import Image from 'next/image';
import Link from 'next/link';

const deals = [
  {
    name: ' Birth of venus',
    artist: 'Botticelli',
    tvl: '32,000,000',
    juniorapy: '28%',
    seniorapy: '5%',
    logoUrl: 'https://fakeimg.pl/800x800/0052FF/fff?text=art&font=museo',
    url: 'innovation-fund ',
  },
  {
    name: ' Birth of venus',
    artist: 'Botticelli',
    tvl: '32,000,000',
    juniorapy: '28%',
    seniorapy: '5%',
    logoUrl: 'https://fakeimg.pl/800x800/0052FF/fff?text=art&font=museo',
    url: 'innovation-fund ',
  },
  {
    name: ' Birth of venus',
    artist: 'Botticelli',
    tvl: '32,000,000',
    juniorapy: '28%',
    seniorapy: '5%',
    logoUrl: 'https://fakeimg.pl/800x800/0052FF/fff?text=art&font=museo',
    url: 'innovation-fund ',
  },
  {
    name: ' Birth of venus',
    artist: 'Botticelli',
    tvl: '32,000,000',
    juniorapy: '28%',
    seniorapy: '5%',
    logoUrl: 'https://fakeimg.pl/800x800/0052FF/fff?text=art&font=museo',
    url: 'innovation-fund ',
  },
  {
    name: ' Birth of venus',
    artist: 'Botticelli',
    tvl: '32,000,000',
    juniorapy: '28%',
    seniorapy: '5%',
    logoUrl: 'https://fakeimg.pl/800x800/0052FF/fff?text=art&font=museo',
    url: 'innovation-fund ',
  },
  {
    name: ' Birth of venus',
    artist: 'Botticelli',
    tvl: '32,000,000',
    juniorapy: '28%',
    seniorapy: '5%',
    logoUrl: 'https://fakeimg.pl/800x800/0052FF/fff?text=art&font=museo',
    url: 'innovation-fund ',
  },
];

export default function DealCard() {
  return (
    <ul
      role='list'
      className='mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-8 text-center'
    >
      {deals.map((deal) => (
        <Link
          key={deal.name}
          className='rounded-3xl px-6 py-8 shadow-2xl  shadow-fuchsia-200  card'
          href={deal.url}
        >
          <Image
            className='mx-auto w-full rounded-3xl'
            src={deal.logoUrl}
            width={300}
            height={300}
            alt=''
          />
          <h2 className='mt-6 text-2xl'>{deal.name}</h2>
          <div className='flex  mt-6 pt-4 justify-between'>
            <div className='text-left uppercase'>
              <p className='text-sm'>Senior APY</p>
              <p className='mt-1 text-2xl'>{deal.seniorapy}</p>
            </div>
            <div className=' text-left uppercase'>
              <p className='text-xs '>Junior APY</p>
              <p className='mt-1 text-3xl '>{deal.juniorapy}</p>
            </div>
          </div>
        </Link>
      ))}
    </ul>
  );
}
