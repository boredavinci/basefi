'use client';

import * as React from 'react';

import {
  RainbowKitProvider,
  lightTheme,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, zora, goerli, baseGoerli, hardhat } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    zora,
    baseGoerli,
    hardhat,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://cool-frequent-road.base-goerli.discover.quiknode.pro/52487125aa0bec31bc84dccec4508ad45c05c5d2/`,
      }),
    }),
    publicProvider(),
  ]
);

// TODO: Replace with your own project ID
const projectId = '588bce7509f04c5b9cd6514fd566fd16';

const { wallets } = getDefaultWallets({
  appName: 'BaseFI',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'BaseFI',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={demoAppInfo}
        theme={lightTheme({
          accentColor: '#0052FF',
          overlayBlur: 'small',
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
