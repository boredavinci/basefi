import { formatEther } from 'viem';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { FundInvestments, formatBytes32 } from '@/service/fund';

export function MyTransactions({
  fundInvestments,
}: {
  fundInvestments?: FundInvestments;
}) {
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
