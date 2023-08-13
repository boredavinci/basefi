import DashStats from '@/components/dash-stats';
import { MyTransactions } from '@/components/my-transactions';
import MyDeal from '@/components/mydeal';

export default function Dashboard() {
  return (
    <>
      <h1 className=' text-4xl lg:text-5xl mt-12'>Dashboard</h1>
      <DashStats />
      <p className='text-lg uppercase'> My investments</p>
      <MyDeal />
      <p className='text-lg uppercase'> My Transactions</p>
      <div className='card2'>
        <MyTransactions />
      </div>
    </>
  );
}
