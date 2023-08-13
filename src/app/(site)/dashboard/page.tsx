'use client';

import { useState, useCallback, useEffect } from 'react';

import {
  PublicClient,
  usePublicClient,
  useAccount,
  useWatchPendingTransactions,
} from 'wagmi';

import DashStats from '@/components/dash-stats';
import { MyTransactions } from '@/components/my-transactions';
import MyDeal from '@/components/mydeal';
import { FundInvestments, getFundInvestments } from '@/service/fund';

export default function Dashboard() {
  const client = usePublicClient();
  const { address: user } = useAccount();
  const [fundInvestments, setFundInvestments] = useState<FundInvestments>();
  useWatchPendingTransactions({
    listener: () => update(client),
  });

  const update = useCallback(
    async (client: PublicClient) =>
      setFundInvestments(await getFundInvestments(client, { user })),
    [user]
  );

  useEffect(() => {
    update(client);
  }, [client, update]);

  return (
    <>
      <h1 className='inline-flex text-5xl lg:text-6xl mt-12 relative '>
        Dashboard
      </h1>
      <DashStats fundInvestments={fundInvestments} />
      <p className='text-lg uppercase'> My investments</p>
      <MyDeal />
      <p className='text-lg uppercase'> My Transactions</p>
      <div className='card2'>
        <MyTransactions fundInvestments={fundInvestments} />
      </div>
    </>
  );
}
