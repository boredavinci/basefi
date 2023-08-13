import { useState } from 'react';

import { formatEther, parseEther } from 'viem';
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useAccount,
} from 'wagmi';

import { BaseFiFundManager } from '@/contracts/BaseFiFundManager';
import { BaseFiUSD } from '@/contracts/BaseFiUSD';
import { BASEFI_FUND_MANAGER, BASEFI_USD } from '@/contracts/addresses';
import { Fund, parseBytes32 } from '@/service/fund';

export default function InvestNow({ fund }: { fund: Fund }) {
  const [srAmount, setSrAmount] = useState(0);
  const [jrAmount, setJrAmount] = useState(0);
  const { address } = useAccount();

  const { data: balance } = useContractRead({
    address: BASEFI_USD,
    abi: BaseFiUSD,
    functionName: 'balanceOf',
    watch: true,
    args: [address || '0x'],
  });
  const { data: allowance } = useContractRead({
    address: BASEFI_USD,
    abi: BaseFiUSD,
    functionName: 'allowance',
    watch: true,
    args: [address || '0x', BASEFI_FUND_MANAGER],
  });

  const { write: approve } = useContractWrite({
    address: BASEFI_USD,
    abi: BaseFiUSD,
    functionName: 'approve',
  });

  const { config: configSr } = usePrepareContractWrite({
    address: BASEFI_FUND_MANAGER,
    abi: BaseFiFundManager,
    functionName: 'invest',
    args: [
      parseBytes32(fund?.symbol || ''),
      true,
      parseEther(srAmount.toString()),
    ],
  });
  const { write: investSr } = useContractWrite(configSr);

  const { config: configJr } = usePrepareContractWrite({
    address: BASEFI_FUND_MANAGER,
    abi: BaseFiFundManager,
    functionName: 'invest',
    args: [
      parseBytes32(fund?.symbol || ''),
      false,
      parseEther(jrAmount.toString()),
    ],
  });
  const { write: investJr } = useContractWrite(configJr);

  return (
    <div>
      <div className=' flex flex-col gap-y-8 card3 p-6 text-xl '>
        <div className='flex flex-row justify-between uppercase'>
          <div className='uppercase'>
            <p className='text-lg font-bold'>Senior apy</p>
            <p className='mt-1 text-6xl font-light'>{fund?.srAPY}%</p>
          </div>
          <div className='uppercase'>
            <p className='text-sm'>Loan to value</p>
            <p className='mt-1 text-3xl '>{fund?.ltv}%</p>
          </div>
        </div>
        <div className='flex h-20 w-full px-6 rounded-full border-4 border-primary-100 hover:border-primary-200 shadow-[inset_0_-5px_15px_rgba(0,0,256,0.3)] '>
          <div className='flex flex-col flex-1 justify-center'>
            <input
              className='w-full mr-4 px-2 bg-transparent'
              type={'number'}
              onChange={(e) => setSrAmount(Number(e.target.value))}
              value={srAmount}
            ></input>
            <p className='text-xs ml-2'>
              balance: {Number(formatEther(balance!)).toFixed(2)}
            </p>
          </div>
          <button
            className='text-primary enabled:hover:text-primary-700 disabled:text-primary-300 font-semibold'
            disabled={!balance}
            onClick={() => balance && setSrAmount(Number(formatEther(balance)))}
          >
            max
          </button>
        </div>
        {allowance != undefined && BigInt(srAmount) * 10n ** 18n > allowance ? (
          <button
            type='button'
            onClick={() => {
              approve({
                args: [BASEFI_FUND_MANAGER, parseEther(srAmount.toString())],
              });
            }}
            className='mt-4 bg-primary disabled:bg-primary-300 h-12 w-full enabled:hover:bg-primary-600 text-white py-2 text-center rounded-full'
          >
            <p>Increase Allowance</p>
          </button>
        ) : (
          <button
            type='button'
            disabled={!investSr}
            onClick={() => {
              investSr?.();
            }}
            className='mt-4 bg-primary disabled:bg-primary-300 h-12 w-full enabled:hover:bg-primary-600 text-white py-2 text-center rounded-full'
          >
            <p>Invest Now</p>
          </button>
        )}
      </div>
      <div className=' flex flex-col gap-y-4 card2 p-6 text-xl mt-6 '>
        <div className='flex justify-between uppercase'>
          <div className='uppercase'>
            <p className='text-sm'>Junior apy</p>
            <p className='mt-1 text-3xl'>+16%</p>
          </div>
        </div>
        <div className='flex h-20 w-full px-6 rounded-full border-4 border-primary-100 hover:border-primary-200 shadow-[inset_0_-5px_15px_rgba(0,0,256,0.3)] '>
          <div className='flex flex-col flex-1 justify-center'>
            <input
              className='w-full mr-4 px-2 bg-transparent'
              type={'number'}
              onChange={(e) => setJrAmount(Number(e.target.value))}
              value={jrAmount}
            ></input>
            <p className='text-xs ml-2'>
              balance: {Number(formatEther(balance!)).toFixed(2)}
            </p>
          </div>
          <button
            className='text-primary enabled:hover:text-primary-700 disabled:text-primary-300 font-semibold'
            disabled={!balance}
            onClick={() => balance && setJrAmount(Number(formatEther(balance)))}
          >
            max
          </button>
        </div>
        {allowance != undefined && BigInt(jrAmount) * 10n ** 18n > allowance ? (
          <button
            type='button'
            onClick={() => {
              approve({
                args: [BASEFI_FUND_MANAGER, parseEther(jrAmount.toString())],
              });
            }}
            className='mt-4 bg-primary disabled:bg-primary-300 h-12 w-full enabled:hover:bg-primary-600 text-white py-2 text-center rounded-full'
          >
            <p>Increase Allowance</p>
          </button>
        ) : (
          <button
            disabled={!investJr}
            onClick={() => investJr?.()}
            className='mt-4 bg-primary disabled:bg-primary-300 h-12 w-full enabled:hover:bg-primary-600 text-white py-2 text-center rounded-full'
          >
            <p>Invest Now</p>
          </button>
        )}
      </div>
    </div>
  );
}
