import { formatEther, getContract, hexToString, stringToHex } from 'viem';
import { PublicClient } from 'wagmi';

import { BaseFiFundManager } from '@/contracts/BaseFiFundManager';
import { BASEFI_FUND_MANAGER } from '@/contracts/addresses';

export const deals = new Map([
  [
    'WL',
    {
      name: ' Water Lily Pond',
      artist: 'Claude Monet',
      tvl: '32,000,000',
      juniorapy: '+16%',
      seniorapy: '4.8%',
      logoUrl: '/water-lily-pond-harmony-in-green.jpg',
      url: 'water-lily-pond-harmony-in-green',
    },
  ],
  [
    'BC',
    {
      name: 'The Ballet Class',
      artist: 'Edgar Degas',
      tvl: '32,000,000',
      juniorapy: '+16%',
      seniorapy: '4.8%',
      logoUrl: '/the-ballet-class.jpg',
      url: 'the-ballet-class',
    },
  ],
  [
    'BDM',
    {
      name: 'Bal du moulin',
      artist: 'Pierre Renoir',
      tvl: '32,000,000',
      juniorapy: '+16%',
      seniorapy: '4.8%',
      logoUrl: '/bal-du-moulin.jpg',
      url: 'bal-du-moulin',
    },
  ],
  [
    'NE',
    {
      name: 'La Nuit étoilée',
      artist: 'Vincent Van Gogh',
      tvl: '32,000,000',
      juniorapy: '+16%',
      seniorapy: '4.8%',
      logoUrl: '/la-nuit-etoilee.jpg',
      url: 'la-nuit-etoilee',
    },
  ],
  [
    'HP',
    {
      name: 'House in provence',
      artist: 'Paul Cézanne',
      tvl: '32,000,000',
      juniorapy: '+16%',
      seniorapy: '4.8%',
      logoUrl: '/houses-in-provence.jpg',
      url: 'houses-in-provence',
    },
  ],
  [
    'IMG',
    {
      name: 'Irises in Monet’s garden',
      artist: 'Claude Monet',
      tvl: '32,000,000',
      juniorapy: '+16%',
      seniorapy: '4.8%',
      logoUrl: '/irises.jpg',
      url: 'irises',
    },
  ],
]);

export const getMyFundInvestments = async (publicClient: PublicClient) => {
  const contract = getContract({
    address: BASEFI_FUND_MANAGER,
    abi: BaseFiFundManager,
    publicClient,
  });
  const filter = await contract.createEventFilter.Invested(
    {},
    { fromBlock: 8366155n, toBlock: 'latest' }
  );
  const res = await Promise.all(
    (
      await publicClient.getFilterLogs({ filter })
    ).map(async (log) => {
      const tx = await publicClient.getBlock({
        blockHash: log.blockHash!,
      });

      return {
        ...log.args,
        timestamp: new Date(Number(tx.timestamp) * 1000),
        hash: log.transactionHash,
      };
    })
  );
  res.reverse();
  return res;
};

export const getFundInvestments = async (
  publicClient: PublicClient,
  {
    symbol,
    user,
  }: {
    symbol?: `0x${string}`;
    user?: `0x${string}`;
  }
) => {
  const contract = getContract({
    address: BASEFI_FUND_MANAGER,
    abi: BaseFiFundManager,
    publicClient,
  });
  const filter = await contract.createEventFilter.Invested(
    { symbol, user },
    { fromBlock: 8366155n, toBlock: 'latest' }
  );
  const res = await Promise.all(
    (
      await publicClient.getFilterLogs({ filter })
    ).map(async (log) => {
      const tx = await publicClient.getBlock({
        blockHash: log.blockHash!,
      });

      return {
        ...log.args,
        timestamp: new Date(Number(tx.timestamp) * 1000),
        hash: log.transactionHash,
      };
    })
  );
  res.reverse();
  return res;
};

export type getFundInvestments = Awaited<ReturnType<typeof getFundInvestments>>;

export const getAllFundsDeployed = async (publicClient: PublicClient) => {
  const contract = getContract({
    address: BASEFI_FUND_MANAGER,
    abi: BaseFiFundManager,
    publicClient,
  });
  const filter = await contract.createEventFilter.FundDeployed(
    {},
    { fromBlock: 8366155n, toBlock: 'latest' }
  );
  return (await publicClient.getFilterLogs({ filter })).map((log) => ({
    ...log.args,
    symbol: log.args.symbol && formatBytes32(log.args.symbol),
  }));
};

export type FundsDeployed = Awaited<ReturnType<typeof getAllFundsDeployed>>;

export type FundDeployed = ArrayElement<FundsDeployed>;

export type ArrayElement<T> = T extends (infer U)[] ? U : T;

export const parseBytes32 = (data: string) => stringToHex(data, { size: 32 });

export const formatBytes32 = (data: `0x${string}`) =>
  hexToString(data, {
    size: 32,
  });

export enum FundStage {
  FUNDING,
  MANAGEMENT,
  EXIT,
}
/**
 struct FundInfo {
		string name;
		bytes32 symbol;
		address admin;
		address seniorToken;
		address juniorToken;
		uint256 totalValue;
		uint8 ltv;
		uint8 srAPY;
		uint8 jrAPY;
		address depositToken;
		uint256 fundingAmount;
		Stage stage;
		uint256 closeFundingTimestamp;
	} 
 */
export const parseFund = ([
  name,
  symbol,
  admin,
  seniorToken,
  juniorToken,
  totalvalue,
  ltv,
  srAPY,
  jrAPY,
  depositToken,
  fundingAmount,
  stage,
  closeFundingTimestamp,
]: readonly [
  string,
  `0x${string}`,
  `0x${string}`,
  `0x${string}`,
  `0x${string}`,
  bigint,
  number,
  number,
  number,
  `0x${string}`,
  bigint,
  number,
  bigint
]) => ({
  name,
  symbol: formatBytes32(symbol),
  admin,
  seniorToken,
  juniorToken,
  totalvalue: formatEther(totalvalue),
  ltv,
  srAPY,
  jrAPY,
  depositToken,
  fundingAmount: formatEther(fundingAmount),
  stage: stage as FundStage,
  closeFundingTimestamp: new Date(Number(closeFundingTimestamp)),
});

export type Fund = Awaited<ReturnType<typeof parseFund>>;
