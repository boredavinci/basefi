import DashStats from '@/components/dash-stats';
import { Transactions } from '@/components/transactions';

export default function Dashboard() {
  return (
    <>
      <h1 className=' text-4xl lg:text-5xl mt-12'>Dashboard</h1>
      <DashStats />
      <div className='card2'>
        <Transactions />
      </div>
    </>
  );
}
