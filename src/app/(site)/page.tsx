import DealCard from '@/components/dealcard';
import { siteConfig } from '@/config/site';

export default function Home() {
  return (
    <main className='flex flex-col'>
      <h1 className='mx-auto text-5xl lg:text-6xl mt-24'>
        {siteConfig.description}
      </h1>
    </main>
  );
}
