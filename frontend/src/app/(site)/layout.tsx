import { ConnectButton } from '@rainbow-me/rainbowkit';

import { MainNav } from '@/components/main-nav';
import { SiteFooter } from '@/components/site-footer';
import { marketingConfig } from '@/config/marketing';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='container z-40 bg-background'>
        <div className='flex h-20 items-center justify-between py-6'>
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <ConnectButton />
          </nav>
        </div>
      </header>
      <main className=' container  max-w-[64rem] mb-24'>{children}</main>
      <SiteFooter />
    </div>
  );
}
