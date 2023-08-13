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
import {
  FundInvestments,
  FundsDeployed,
  getAllFundsDeployed,
  getFundInvestments,
} from '@/service/fund';

export default function Dashboard() {
  const client = usePublicClient();
  const { address: user } = useAccount();
  const [fundInvestments, setFundInvestments] = useState<FundInvestments>();
  const [funds, setFunds] = useState<FundsDeployed>();

  useEffect(() => {
    (async () => setFunds(await getAllFundsDeployed(client)))();
  }, [client]);

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
      <DashStats fundInvestments={fundInvestments} fundsDeployed={funds} />
      <p className='text-lg uppercase'> My investments</p>
      <MyDeal fundInvestments={fundInvestments} fundsDeployed={funds} />
      <p className='text-lg uppercase'> My Transactions</p>
      <div className='card2'>
        <MyTransactions fundInvestments={fundInvestments} />
      </div>
    </>
  );
}
