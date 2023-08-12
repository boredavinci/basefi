import { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useContractRead } from 'wagmi';

import Status from '@/components/status';
import { BaseFiFundManager } from '@/contracts/BaseFiFundManager';
import { BASEFI_FUND_MANAGER } from '@/contracts/addresses';
import {
  FundDeployed,
  FundsDeployed,
  deals,
  parseBytes32,
  parseFund,
} from '@/service/fund';

export default function DealCard({
  fund,
  i,
}: {
  fund: FundDeployed;
  i: number;
}) {
  const { data: fundData } = useContractRead({
    address: BASEFI_FUND_MANAGER,
    abi: BaseFiFundManager,
    functionName: 'fundMap',
    args: [parseBytes32(fund.symbol!)],
    select: parseFund,
  });

  if (!fundData) return null;

  return (
    <Link
      key={fund.symbol}
      className='rounded-3xl px-6 py-8 shadow-2xl  shadow-fuchsia-200 h-fit card relative'
      href={`/${fund.symbol}`}
    >
      <div className='absolute shadow-2xl top-12 right-8'>
        <Status stage={fundData.stage} />
      </div>
      <Image
        className='mx-auto w-full rounded-3xl 24 h-80 object-cover'
        src={(fund.symbol && deals.get(fund.symbol)?.logoUrl) || ''}
        width={400}
        height={400}
        alt={(fund.symbol && deals.get(fund.symbol)?.name) || ''}
      />
      <h2 className='mt-6 text-2xl'>{fund.name}</h2>
      <p className='mt-4 text-xl'>
        {fund.symbol && deals.get(fund.symbol)?.artist}
      </p>
      <div className='flex  mt-6 pt-4 justify-between'>
        <div className='text-left uppercase'>
          <p className='text-sm'>Senior APY</p>
          <p className='mt-1 text-2xl'>{fund.srAPY}%</p>
        </div>
        <div className=' text-left uppercase'>
          <p className='text-xs '>Junior APY</p>
          <p className='mt-1 text-3xl '>{fund.jrAPY}%</p>
        </div>
      </div>
    </Link>
  );
}
