import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const repayments = [
  {
    repayment: '12',
    date: 'Sep 15, 2023',
    principle: '0',
    interest: '250,000',
  },
  {
    repayment: '12',
    date: 'Sep 15, 2023',
    principle: '0',
    interest: '250,000',
  },
  {
    repayment: '12',
    date: 'Sep 15, 2023',
    principle: '0',
    interest: '250,000',
  },
  {
    repayment: '12',
    date: 'Sep 15, 2023',
    principle: '0',
    interest: '250,000',
  },
];

export function Activity() {
  return (
    <Table>
      <TableHeader>
        <TableRow className='text-xs uppercase'>
          <TableHead className='w-[100px]'>No.</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Principle due</TableHead>
          <TableHead className='text-right'>Interest Due</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {repayments.map((repayment) => (
          <TableRow
            key={repayment.repayment}
            className='hover:bg-primary-50/75'
          >
            <TableCell className='font-medium'>{repayment.repayment}</TableCell>
            <TableCell>{repayment.date}</TableCell>
            <TableCell>{repayment.interest}</TableCell>
            <TableCell className='text-right'>{repayment.principle}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
