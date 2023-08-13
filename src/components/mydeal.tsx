import Image from 'next/image';
import Link from 'next/link';
import { formatEther } from 'viem';

import Status from '@/components/status';
import {
  FundInvestments,
  FundStage,
  FundsDeployed,
  calculateReturns,
  deals,
  formatBytes32,
  getFundDeployed,
  parseBytes32,
} from '@/service/fund';

export default function MyDeal({
  fundInvestments,
  fundsDeployed,
}: {
  fundInvestments?: FundInvestments;
  fundsDeployed?: FundsDeployed;
}) {
  const investmentTargets =
    fundsDeployed &&
    [
      ...new Set(
        fundInvestments?.map((fundInvestment) =>
          formatBytes32(fundInvestment.symbol!)
        )
      ),
    ].map((symbol) => {
      const fund = getFundDeployed(fundsDeployed, symbol);
      const total = fundInvestments
        ?.filter((invest) => formatBytes32(invest.symbol!) == symbol)
        .reduce((acc, x) => acc + x.amount!, 0n);
      const returned = fundInvestments
        ?.filter((invest) => formatBytes32(invest.symbol!) == symbol)
        .map((fund) => calculateReturns(fund, fundsDeployed))
        .reduce((acc, x) => acc! + x!, 0n);

      return {
        ...fund,
        total,
        returned,
      };
    });

  console.log(investmentTargets);

  return (
    <ul
      role='list'
      className='mx-auto grid max-w-2xl grid-cols-1 gap-6  sm:grid-cols-2 lg:grid-cols-3 lg:mx-0 lg:max-w-none lg:gap-8 text-center grid-flow-row-dense'
    >
      {investmentTargets?.map((deal) => (
        <Link
          key={deal.name}
          className='rounded-3xl px-6 py-8 shadow-2xl  shadow-fuchsia-200 h-fit card relative'
          href={`/${deal.symbol}`}
        >
          <div className='absolute shadow-2xl top-10 right-6'>
            <Status stage={FundStage.FUNDING} />
          </div>

          <Image
            className='mx-auto w-full rounded-3xl 24 h-60 object-cover'
            src={(deal.symbol && deals.get(deal.symbol)?.logoUrl) || ''}
            width={400}
            height={400}
            alt={deal.symbol || ''}
          />
          <h2 className='mt-6 text-2xl'>{deal.name}</h2>
          <div className='flex pt-4 justify-between'>
            <div className='text-left uppercase'>
              <p className='text-xs'>Invested</p>
              <p className='mt-1 text-2xl'>{formatEther(deal.total || 0n)}</p>
            </div>
            <div className=' text-left uppercase'>
              <p className='text-xs '>Expected Return</p>
              <p className='mt-1 text-2xl '>
                {formatEther(deal.returned || 0n)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </ul>
  );
}
