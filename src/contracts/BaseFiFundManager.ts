export const BaseFiFundManager = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'symbol',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalPayback',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'seniorPayback',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'juniorPayback',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'seniorSupply',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'juniorSupply',
        type: 'uint256',
      },
    ],
    name: 'Exited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'symbol',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'admin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'seniorToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'juniorToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'ratio',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'srAPY',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'jrAPY',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'depositToken',
        type: 'address',
      },
    ],
    name: 'FundDeployed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'symbol',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'FundingEnded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'symbol',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isSenior',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Invested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'symbol',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'seniorPayback',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'juniorPayback',
        type: 'uint256',
      },
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'symbol',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'calculateJuniorPayback',
    outputs: [
      {
        internalType: 'uint256',
        name: 'juniorPayback',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'juniorBalance',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'symbol',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'calculateSeniorPayback',
    outputs: [
      {
        internalType: 'uint256',
        name: 'seniorPayback',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'seniorBalance',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'bytes32',
        name: 'symbol',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'admin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'totalValue',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'ltv',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'srAPY',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'jrAPY',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: 'depositToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'closeFundingTimestamp',
        type: 'uint256',
      },
    ],
    name: 'deployNewFund',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'symbol',
        type: 'bytes32',
      },
    ],
    name: 'endFundingAndClaim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'symbol',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'exitAndPayback',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'exitMap',
    outputs: [
      {
        internalType: 'uint256',
        name: 'totalPayback',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'seniorPayback',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'juniorPayback',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'seniorSupply',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'juniorSupply',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'fundMap',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'bytes32',
        name: 'symbol',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'admin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'seniorToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'juniorToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'totalValue',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'ltv',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'srAPY',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'jrAPY',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: 'depositToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'fundingAmount',
        type: 'uint256',
      },
      {
        internalType: 'enum BaseFiFundManager.Stage',
        name: 'stage',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'closeFundingTimestamp',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'symbol',
        type: 'bytes32',
      },
      {
        internalType: 'bool',
        name: 'isSenior',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'invest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'symbol',
        type: 'bytes32',
      },
    ],
    name: 'withdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
