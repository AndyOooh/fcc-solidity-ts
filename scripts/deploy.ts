import { ethers, run, network } from 'hardhat';
import { ETHERSCAN_API_KEY } from '../VARS';

const main = async () => {
  try {
    const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    console.log('Deploying contract...');
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    console.log(`Deployed contract to: ${simpleStorage.address}`);

    console.log('Network.config:', network.config);
    if (network.config.chainId === 5 && ETHERSCAN_API_KEY) {
      console.log('Verifying contract...');
      await simpleStorage.deployTransaction.wait(6); // Wait 6 confirmations for etherscan to catch up.
      await verify(simpleStorage.address, []);
    }

    const currentValue = await simpleStorage.retrieve();
    console.log('🚀 currentValue', currentValue);

    const storeResponse = await simpleStorage.store(42);
    await storeResponse.wait(1);

    const updatedValue = await simpleStorage.retrieve();
    console.log('🚀 updatedValue', updatedValue);
  } catch (error) {
    console.log('🚀 error', error);
  }
};

const verify = async (contractAddress: String, args: any[]) => {
  console.log('Verifying contract...');
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
    const [deployer] = await ethers.getSigners(); // not tested as we get error bc ES already verified. from github copilot
    console.log('Deployer address:', deployer.address);
    console.log('Deployer balance:', (await deployer.getBalance()).toString());
    console.log('Deployer network:', await deployer.getChainId());
    console.log('Deployer nonce:', await deployer.getTransactionCount());
    console.log('Deployer gas price:', (await deployer.getGasPrice()).toString());
  } catch (error: any) {
    if (error.message.includes('Already verified')) {
      console.log('Contract already verified');
    } else {
      console.log('🚀 49 error: ', error);
    }
  }
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
