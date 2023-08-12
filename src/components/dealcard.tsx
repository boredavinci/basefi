import Image from 'next/image';
import Link from 'next/link';

const deals = [
  {
    name: ' Water Lily Pond',
    artist: 'Claude Monet',
    tvl: '32,000,000',
    juniorapy: '28%',
    seniorapy: '5%',
    logoUrl: '/water-lily-pond-harmony-in-green.jpg',
    url: 'water-lily-pond-harmony-in-green',
  },
  {
    name: 'The Ballet Class',
    artist: 'Edgar Degas',
    tvl: '32,000,000',
    juniorapy: '28%',
    seniorapy: '5%',
    logoUrl: '/the-ballet-class.jpg',
    url: 'the-ballet-class',
  },
  {
    name: 'Bal du moulin de la Galette',
    artist: 'Pierre Renoir',
    tvl: '32,000,000',
    juniorapy: '28%',
    seniorapy: '5%',
    logoUrl: '/bal-du-moulin.jpg',
    url: 'bal-du-moulin',
  },
  {
    name: 'La Nuit étoilée',
    artist: 'Vincent Van Gogh',
    tvl: '32,000,000',
    juniorapy: '28%',
    seniorapy: '5%',
    logoUrl: '/la-nuit-etoilee.jpg',
    url: 'la-nuit-etoilee',
  },
  {
    name: 'House in provence',
    artist: 'Paul Cézanne',
    tvl: '32,000,000',
    juniorapy: '28%',
    seniorapy: '5%',
    logoUrl: '/houses-in-provence.jpg',
    url: 'houses-in-provence',
  },
  {
    name: 'Irises in Monet’s garden',
    artist: 'Claude Monet',
    tvl: '32,000,000',
    juniorapy: '28%',
    seniorapy: '5%',
    logoUrl: '/irises.jpg',
    url: 'irises',
  },
];

export default function DealCard() {
  return (
    <ul
      role='list'
      className='mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-8 text-center grid-flow-row-dense'
    >
      {deals.map((deal) => (
        <Link
          key={deal.name}
          className='rounded-3xl px-6 py-8 shadow-2xl  shadow-fuchsia-200 h-fit card'
          href={deal.url}
        >
          <Image
            className='mx-auto w-full rounded-3xl 24 h-80 object-cover'
            src={deal.logoUrl}
            width={400}
            height={400}
            alt={deal.name}
          />
          <h2 className='mt-6 text-2xl'>{deal.name}</h2>
          <p className='mt-4 text-xl'>{deal.artist}</p>
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
