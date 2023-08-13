'use client';

import { useCallback, useEffect, useState } from 'react';

import { formatEther } from 'viem';
import {
  PublicClient,
  useAccount,
  usePublicClient,
  useWatchPendingTransactions,
} from 'wagmi';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  formatBytes32,
  getFundInvestments,
  parseBytes32,
} from '@/service/fund';

export function MyTransactions() {
  const client = usePublicClient();
  const { address: user } = useAccount();
  const [fundInvestments, setFundInvestments] = useState<getFundInvestments>();
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
    <Table>
      <TableHeader>
        <TableRow className='text-xs uppercase'>
          <TableHead className='w-[100px]'>Asset</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className='text-right'>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fundInvestments?.map((transaction) => (
          <TableRow key={transaction.hash} className='hover:bg-primary-50/75'>
            <TableCell>
              {transaction.symbol && formatBytes32(transaction.symbol)}
            </TableCell>
            <TableCell>{transaction.isSenior ? 'Senior' : 'Junior'}</TableCell>
            <TableCell>
              ${transaction.amount ? formatEther(transaction.amount) : null}
            </TableCell>
            <TableCell className='text-right'>
              {transaction.timestamp.toDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
