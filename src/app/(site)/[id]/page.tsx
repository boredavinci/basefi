'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import { useContractRead } from 'wagmi';

import { Activity } from '@/components/activity';
import InvestNow from '@/components/invest-section';
import ProductStats from '@/components/product-stats';
import Status from '@/components/status';
import { Transactions } from '@/components/transactions';
import { BaseFiFundManager } from '@/contracts/BaseFiFundManager';
import { BASEFI_FUND_MANAGER } from '@/contracts/addresses';
import { deals, parseBytes32, parseFund } from '@/service/fund';

export default function Page({ params: { id } }: { params: { id: string } }) {
  const [isClient, setIsClient] = useState(false);
  const { data: fundData } = useContractRead({
    address: BASEFI_FUND_MANAGER,
    abi: BaseFiFundManager,
    functionName: 'fundMap',
    args: [parseBytes32(id)],
    select: parseFund,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <h1 className='inline-flex text-4xl lg:text-5xl mt-1 relative'>
          Water lily
        </h1>
        <Status stage={fundData?.stage} />
      </div>
      <div className='flex flex-col md:flex-row '>
        <div className='flex flex-col md:w-1/2 mr-6'>
          <Image
            className='mx-auto w-full rounded-3xl mb-16'
            src={deals.get(id)?.logoUrl || ''}
            width={500}
            height={500}
            alt=''
          />
          <ProductStats />
          <p className='text-md mb-6 font-medium'>
            Water Lilies is a series of approximately 250 oil paintings by
            French Impressionist Claude Monet (1840–1926). The paintings depict
            his flower garden at his home in Giverny, and were the main focus of
            his artistic production during the last thirty years of his life.
            Many of the works were painted while Monet suffered from cataracts
          </p>
        </div>

        <div className='flex flex-col w-full md:w-1/2 gap-y-6'>
          <InvestNow fund={fundData!} />
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
