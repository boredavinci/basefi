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

import { getFundInvestments } from '@/service/fund';

const transactions = [
  {
    address: '0xd54FF94FC8cdD1A9004CAda5a7F9AD644ccc9A89',
    status: 'Deposit',
    amount: '+$2500 USDC',
    date: 'Aug 12, 2023',
    transactionUrl:
      'https://goerli.etherscan.io/tx/0x955b6f55e7759dacf38a59005ed1a7893d15dab36de69cb9fb4c5108002fefaa',
  },
  {
    address: '0xd54FF94FC8cdD1A9004CAda5a7F9AD644ccc9A89',
    status: 'Deposit',
    amount: '+$2500 USDC',
    date: 'Aug 12, 2023',
    transactionUrl:
      'https://goerli.etherscan.io/tx/0x955b6f55e7759dacf38a59005ed1a7893d15dab36de69cb9fb4c5108002fefaa',
  },
  {
    address: '0xd54FF94FC8cdD1A9004CAda5a7F9AD644ccc9A89',
    status: 'Deposit',
    amount: '+$2500 USDC',
    date: 'Aug 12, 2023',
    transactionUrl:
      'https://goerli.etherscan.io/tx/0x955b6f55e7759dacf38a59005ed1a7893d15dab36de69cb9fb4c5108002fefaa',
  },
  {
    address: '0xd54FF94FC8cdD1A9004CAda5a7F9AD644ccc9A89',
    status: 'Deposit',
    amount: '+$2500 USDC',
    date: 'Aug 12, 2023',
    transactionUrl:
      'https://goerli.etherscan.io/tx/0x955b6f55e7759dacf38a59005ed1a7893d15dab36de69cb9fb4c5108002fefaa',
  },
  {
    address: '0xd54FF94FC8cdD1A9004CAda5a7F9AD644ccc9A89',
    status: 'Deposit',
    amount: '+$2500 USDC',
    date: 'Aug 12, 2023',
    transactionUrl:
      'https://goerli.etherscan.io/tx/0x955b6f55e7759dacf38a59005ed1a7893d15dab36de69cb9fb4c5108002fefaa',
  },
  {
    address: '0xd54FF94FC8cdD1A9004CAda5a7F9AD644ccc9A89',
    status: 'Deposit',
    amount: '+$2500 USDC',
    date: 'Aug 12, 2023',
    transactionUrl:
      'https://goerli.etherscan.io/tx/0x955b6f55e7759dacf38a59005ed1a7893d15dab36de69cb9fb4c5108002fefaa',
  },
  {
    address: '0xd54FF94FC8cdD1A9004CAda5a7F9AD644ccc9A89',
    status: 'Deposit',
    amount: '+$2500 USDC',
    date: 'Aug 12, 2023',
    transactionUrl:
      'https://goerli.etherscan.io/tx/0x955b6f55e7759dacf38a59005ed1a7893d15dab36de69cb9fb4c5108002fefaa',
  },
  {
    address: '0xd54FF94FC8cdD1A9004CAda5a7F9AD644ccc9A89',
    status: 'Deposit',
    amount: '+$2500 USDC',
    date: ' Feb 18, 2023',
    transactionUrl:
      'https://goerli.etherscan.io/tx/0x955b6f55e7759dacf38a59005ed1a7893d15dab36de69cb9fb4c5108002fefaa',
  },
];

export function Transactions({
  symbol,
  user,
}: {
  symbol?: `0x${string}`;
  user?: `0x${string}`;
}) {
  const client = usePublicClient();
  const [fundInvestments, setFundInvestments] = useState<getFundInvestments>();
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
            <TableCell>${formatEther(transaction.amount!)}</TableCell>
            <TableCell className='text-right'>
              {transaction.timestamp.toDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
