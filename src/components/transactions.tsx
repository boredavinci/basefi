'use client';

import { useCallback, useEffect, useState } from 'react';

import { formatEther } from 'viem';
import {
  PublicClient,
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

import { FundInvestments, getFundInvestments } from '@/service/fund';

export function Transactions({
  symbol,
  user,
}: {
  symbol?: `0x${string}`;
  user?: `0x${string}`;
}) {
  const client = usePublicClient();
  const [fundInvestments, setFundInvestments] = useState<FundInvestments>();
  useWatchPendingTransactions({
    listener: () => update(client),
  });

  const update = useCallback(
    async (client: PublicClient) =>
      setFundInvestments(await getFundInvestments(client, { symbol, user })),
    [symbol, user]
  );

  useEffect(() => {
    update(client);
  }, [client, update]);

  return (
    <Table>
      <TableHeader>
        <TableRow className='text-xs uppercase'>
          <TableHead className='w-[100px]'>Address</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className='text-right'>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fundInvestments?.map((transaction) => (
          <TableRow key={transaction.hash} className='hover:bg-primary-50/75'>
            <TableCell>{transaction.user}</TableCell>
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
