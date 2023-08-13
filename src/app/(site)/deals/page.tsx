'use client';

import { useState, useEffect } from 'react';

import { usePublicClient } from 'wagmi';

import DealCard from '@/components/dealcard';
import { FundsDeployed, getAllFundsDeployed } from '@/service/fund';

export default function Deals() {
  const client = usePublicClient();
  const [funds, setFunds] = useState<FundsDeployed>();

  useEffect(() => {
    (async () => setFunds(await getAllFundsDeployed(client)))();
  }, [client]);
  return (
    <div>
      <h1 className=' text-5xl lg:text-6xl  mt-12'>Deals</h1>
      <ul
        role='list'
        className='mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-8 text-center grid-flow-row-dense'
      >
        {funds &&
          funds.map((fund, i) => (
            <DealCard key={fund.symbol} fund={fund} i={i} />
          ))}
      </ul>
    </div>
  );
}
