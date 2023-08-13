import { useState, useCallback, useEffect } from 'react';

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

import { FundInvestments, getFundInvestments } from '@/service/fund';

export function Activity({ symbol }: { symbol: `0x${string}` }) {
  const client = usePublicClient();
  const { address } = useAccount();
  const [fundInvestments, setFundInvestments] = useState<FundInvestments>();
  useWatchPendingTransactions({
    listener: () => update(client),
  });

  const update = useCallback(
    async (client: PublicClient) => {
      const res = await getFundInvestments(client, { symbol, user: address });
      res.reverse();
      setFundInvestments(res);
    },
    [address, symbol]
  );

  useEffect(() => {
    update(client);
  }, [client, update]);

  if (!fundInvestments) {
    return;
  }

  return (
    <>
      <p className='text-lg uppercase '> My Investments</p>
      <div className='card2'>
        <Table>
          <TableHeader>
            <TableRow className='text-xs uppercase'>
              <TableHead className='w-[100px]'>No.</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className='text-right'>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fundInvestments?.map((investments, i) => (
              <TableRow
                key={investments.hash}
                className='hover:bg-primary-50/75'
              >
                <TableCell className='font-medium'>{i + 1}</TableCell>
                <TableCell>
                  {investments.isSenior ? 'Senior' : 'Junior'}
                </TableCell>
                <TableCell>
                  ${investments.amount ? formatEther(investments.amount) : null}
                </TableCell>
                <TableCell className='text-right'>
                  {investments.timestamp.toDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
