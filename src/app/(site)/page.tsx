import Script from 'next/script';
import SplineViewer from 'spline-viewer';

import { siteConfig } from '@/config/site';

export default function Home() {
  return (
    <main className='flex flex-col w-full'>
      <h1 className='text-5xl lg:text-6xl mt-24 w-full text-center'>
        {siteConfig.description}
      </h1>
      <div className='h-screen w-full'>
        <Script
          type='module'
          src='https://unpkg.com/@splinetool/viewer@0.9.418/build/spline-viewer.js'
        ></Script>
        <SplineViewer url='https://prod.spline.design/fXZdpdmlsl9yV-0v/scene.splinecode'></SplineViewer>
      </div>
    </main>
  );
}
