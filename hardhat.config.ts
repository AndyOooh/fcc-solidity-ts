import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-etherscan';
import { HardhatUserConfig } from 'hardhat/config';
import 'solidity-coverage'
import '@typechain/hardhat';

import './tasks/block-number';

import { GOERLI_URL_ALCHEMY, META_PK1, ETHERSCAN_API_KEY, GAS_REPORTER_ENABLED, CMC_API } from './config/VARS';

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    goerli: {
      url: GOERLI_URL_ALCHEMY,
      accounts: [META_PK1!],
      chainId: 5,
    },
    // localhost: {
    //   url: 'http://127.0.0.1:8545/',
    //   chainId: 31337,
    // },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: GAS_REPORTER_ENABLED ? true : false,
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: 'USD',
    // gasPrice: 21,
    coinmarketcap: CMC_API, // needed for currency to work
    token: 'ETH',
  },
};

export default config;
