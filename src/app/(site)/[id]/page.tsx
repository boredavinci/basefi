import Image from 'next/image';

import { Activity } from '@/components/activity';
import InvestNow from '@/components/invest-section';
import ProductStats from '@/components/product-stats';
import Status from '@/components/status';
import { Transactions } from '@/components/transactions';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <div className='flex justify-between items-center'>
        <h1 className='inline-flex text-5xl lg:text-6xl mt-12 relative '>
          Water lily
        </h1>
        <Status />
      </div>
      <div className='flex flex-col md:flex-row '>
        <div className='flex flex-col md:w-1/2 mr-6'>
          <Image
            className='mx-auto w-full rounded-3xl mb-16'
            src={`/${params.id}.jpg`}
            width={500}
            height={500}
            alt=''
          />
          <ProductStats />
          <p className='text-md mb-6'>
            Water Lilies is a series of approximately 250 oil paintings by
            French Impressionist Claude Monet (1840–1926). The paintings depict
            his flower garden at his home in Giverny, and were the main focus of
            his artistic production during the last thirty years of his life.
            Many of the works were painted while Monet suffered from cataracts
          </p>
        </div>

        <div className='flex flex-col w-full md:w-1/2 gap-y-6'>
          <InvestNow />
          <p className='text-lg uppercase '> Latest repayments</p>
          <div className='card2'>
            <Activity />
          </div>
        </div>
      </div>
      <p className='text-lg uppercase '> Recent Transactions</p>
      <div className='card2'>
        <Transactions />
      </div>
    </>
  );
}
