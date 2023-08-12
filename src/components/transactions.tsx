import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const transactions = [
  {
    address: '0xd54FF94FC8cdD1A9004CAda5a7F9AD644ccc9A89',
    status: 'Deposit',
    amount: '+$2500 USDC',
    date: ' Feb 18, 2023',
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
  {
    address: '0xd54FF94FC8cdD1A9004CAda5a7F9AD644ccc9A89',
    status: 'Deposit',
    amount: '+$2500 USDC',
    date: ' Feb 18, 2023',
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
  {
    address: '0xd54FF94FC8cdD1A9004CAda5a7F9AD644ccc9A89',
    status: 'Deposit',
    amount: '+$2500 USDC',
    date: ' Feb 18, 2023',
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
  {
    address: '0xd54FF94FC8cdD1A9004CAda5a7F9AD644ccc9A89',
    status: 'Deposit',
    amount: '+$2500 USDC',
    date: ' Feb 18, 2023',
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

export function Transactions() {
  return (
    <Table>
      <TableHeader>
        <TableRow className='text-xs uppercase'>
          <TableHead className='w-[100px]'>Address</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className='text-right'>TX</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow
            key={transaction.transactionUrl}
            className='hover:bg-primary-50/75'
          >
            <TableCell>{transaction.address}</TableCell>
            <TableCell>{transaction.status}</TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell className='text-right'>TX</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
