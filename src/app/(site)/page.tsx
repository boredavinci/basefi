import DealCard from '@/components/dealcard';
import { siteConfig } from '@/config/site';

export default function Home() {
  return (
    <main className='flex flex-col  '>
      <section className='space-y-6 '>
        <div className='text-center'>
          <h1 className=' text-5xl lg:text-6xl  mt-20'>
            {siteConfig.description}
          </h1>
          <DealCard />
        </div>
      </section>
    </main>
  );
}
