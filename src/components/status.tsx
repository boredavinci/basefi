import React from 'react';

import { FundStage } from '@/service/fund';

export default function Status({ stage }: { stage: FundStage }) {
  if (stage === FundStage.FUNDING) {
    return (
      <span className='inline-flex items-center bg-green-100/70 text-green-800 text-sm font-bold mr-2 px-2 py-1 rounded-full'>
        <span className='w-3 h-3 mr-2 bg-green-500 rounded-full'></span>
        Open
      </span>
    );
  } else if (stage === FundStage.MANAGEMENT) {
    return (
      <span className='inline-flex items-center bg-yellow-100/70 text-yellow-800 text-sm font-bold mr-2 px-2 py-1 rounded-full'>
        <span className='w-3 h-3 mr-2 bg-yellow-500 rounded-full'></span>
        Closed
      </span>
    );
  } else if (stage === FundStage.EXIT) {
    return (
      <span className='inline-flex items-center bg-slate-100/70 text-slate-800 text-sm font-bold mr-2 px-2 py-1 rounded-full'>
        <span className='w-3 h-3 mr-2 bg-slate-500 rounded-full'></span>
        Exited
      </span>
    );
  }
}
