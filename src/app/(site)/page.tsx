'use client';

import Spline from '@splinetool/react-spline';
import Script from 'next/script';

import { siteConfig } from '@/config/site';

export default function Home() {
  return (
    <main className='flex flex-col w-full'>
      <h1 className='text-6xl lg:text-7xl mt-24 w-full text-center'>
        {siteConfig.description}
      </h1>
      <div className='h-screen w-full'>
        <Script
          type='module'
          src='https://unpkg.com/@splinetool/viewer@0.9.418/build/spline-viewer.js'
        ></Script>
        <Spline scene='https://prod.spline.design/fXZdpdmlsl9yV-0v/scene.splinecode' />
      </div>
    </main>
  );
}
