import Image from 'next/image';

import { Activity } from '@/components/activity';
import InvestNow from '@/components/invest-section';
import ProductStats from '@/components/product-stats';
import { Transactions } from '@/components/transactions';

export default function Page() {
  return (
    <>
      <h1 className=' text-4xl lg:text-5xl mt-12'>Art name</h1>
      <div className='flex flex-col md:flex-row '>
        <div className='flex flex-col md:w-1/2 mr-6'>
          <Image
            className='mx-auto w-full rounded-3xl mb-16'
            src='https://fakeimg.pl/800x800/0052FF/fff?text=art&font=museo'
            width={300}
            height={300}
            alt=''
          />
          <ProductStats />
          <p className='text-md mb-6 font-medium'>
            Sugar plum jelly beans oat cake tiramisu muffin powder topping. Cake
            jelly muffin muffin chocolate bar. Gingerbread sweet roll
            marshmallow donut topping gummi bears liquorice jelly-o. Apple pie
            donut apple pie ice cream tootsie roll topping tootsie roll. Sweet
            roll fruitcake jujubes apple pie tootsie roll biscuit brownie
            topping. Shortbread lollipop lollipop pudding bonbon sesame snaps
            caramels. Gingerbread muffin candy dessert gummi bears shortbread
            sweet roll chocolate gummi bears.
          </p>
        </div>

        <div className='flex flex-col w-full md:w-1/2 gap-y-6'>
          <InvestNow />
          <p className='text-lg uppercase '> Latest repayments</p>
          <div className='card2'>
            <Activity />
          </div>
        </div>
      </div>
      <p className='text-lg uppercase '> Recent Transactions</p>
      <div className='card2'>
        <Transactions />
      </div>
    </>
  );
}
