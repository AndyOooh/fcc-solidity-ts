import { ethers } from 'ethers';
import {
  GANACHE_RPC_URL,
  MAIN_WALLET,
  GANACHE_PK1,
  GANACHE_WALLET1,
  GOERLI_RPC_URL,
  META_GOERLI_PK1,
  ALCH_RPC_URL,
  PK1_PW
} from './VARS.js';
import fse from 'fs-extra';

const main = async () => {
  //   connect to <rpc url> ex: https://goerli.infura.io/v3/
  try {
    const provider = new ethers.providers.JsonRpcProvider(ALCH_RPC_URL);
    const wallet = new ethers.Wallet(META_GOERLI_PK1, provider);
    // const encryptedJson = fse.readFileSync('.encryptedKey.json', 'utf8');
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson, PK1_PW);
    // wallet = await wallet.connect(provider);
    const abi = fse.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf-8');
    const binary = fse.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf-8');

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

    console.log('Deploying...')
    const contract = await contractFactory.deploy();
    console.log('Deployed. awaiting receipt...');
    const transactionReceipt = await contract.deployTransaction.wait(1); // arg is number of confirmations
    console.log('deployed to address: ', transactionReceipt.contractAddress, contract.address);
    const currentFavNum = await contract.retrieve();
    console.log('🚀 ~ file: deploy.js ~ line 30 ~ currentFavNum', currentFavNum.toString())
    const txResponse = await contract.store('1002000300400500600');
    const txReceipt = await txResponse.wait(1);
    const newFavNum = await contract.retrieve();
    console.log('🚀 ~ file: deploy.js ~ line 34 ~ newFavNum', newFavNum.toString())

    process.exit(0);
  } catch (error) {
    console.log('🚀 ~ file: deploy.js ~ line 20 ~ error', error);
    process.exit(1);
  }
};
await main();
