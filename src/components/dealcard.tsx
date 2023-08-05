import Image from 'next/image';
import Link from 'next/link';

const deals = [
  {
    name: 'Innovation fund',
    closing: '25 days',
    tvl: '32,000,000',
    seniorapy: '5%',
    logoUrl: 'https://fakeimg.pl/200x200/0052FF/fff?text=logo&font=museo',
    url: 'innovation-fund ',
  },
  {
    name: 'Innovation fund',
    closing: '25 days',
    tvl: '32,000,000',
    seniorapy: '5%',
    logoUrl: 'https://fakeimg.pl/200x200/0052FF/fff?text=logo&font=museo',
    url: 'innovation-fund ',
  },
  {
    name: 'Innovation fund',
    closing: '25 days',
    tvl: '32,000,000',
    seniorapy: '5%',
    logoUrl: 'https://fakeimg.pl/200x200/0052FF/fff?text=logo&font=museo',
    url: 'innovation-fund ',
  },
  {
    name: 'Innovation fund',
    closing: '25 days',
    tvl: '32,000,000',
    seniorapy: '5%',
    logoUrl: 'https://fakeimg.pl/200x200/0052FF/fff?text=logo&font=museo',
    url: 'innovation-fund ',
  },
  {
    name: 'Innovation fund',
    closing: '25 days',
    tvl: '32,000,000',
    seniorapy: '5%',
    logoUrl: 'https://fakeimg.pl/200x200/0052FF/fff?text=logo&font=museo',
    url: 'innovation-fund ',
  },
  {
    name: 'Innovation fund',
    closing: '25 days',
    tvl: '32,000,000',
    seniorapy: '5%',
    logoUrl: 'https://fakeimg.pl/200x200/0052FF/fff?text=logo&font=museo',
    url: 'innovation-fund ',
  },
];

export default function DealCard() {
  return (
    <ul
      role='list'
      className='mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8 text-center'
    >
      {deals.map((deal) => (
        <Link
          key={deal.name}
          className='rounded-3xl px-6 py-8 shadow-2xl  shadow-fuchsia-200  card'
          href={deal.url}
        >
          <Image
            className='mx-auto h-24 w-24 rounded-full '
            src={deal.logoUrl}
            width={200}
            height={200}
            alt=''
          />
          <h2 className='mt-6 text-2xl'>{deal.name}</h2>
          <h3 className='mt-6 text-xl'>{deal.closing} till close</h3>
          <div className='flex  mt-6 pt-4 justify-between'>
            <div className=' text-left '>
              <p className='text-sm uppercase font-semibold '>Senior APY</p>
              <p className=' text-lg font-bold'>{deal.seniorapy}</p>
            </div>
            <div className=' text-left'>
              <p className='text-sm uppercase font-semibold'>TVL</p>
              <p className=' text-lg font-bold'>{deal.tvl}</p>
            </div>
          </div>
        </Link>
      ))}
    </ul>
  );
}
