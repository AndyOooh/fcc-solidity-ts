import { task } from 'hardhat/config';

task('block-number', 'Prints the currrent block number').setAction(async (taskArgs, hre) => {
  const blockNumber = await hre.ethers.provider.getBlockNumber();
  console.log(blockNumber);
});

// export default task; // redundant I think.
