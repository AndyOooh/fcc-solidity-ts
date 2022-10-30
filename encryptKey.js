import { ethers } from 'ethers';
import fs from 'fs-extra';
import { META_GOERLI_PK1, PK1_PW } from './VARS.js';

const main = async () => {
  const wallet = new ethers.Wallet(META_GOERLI_PK1);
  const encryptedJsonKey = await wallet.encrypt(PK1_PW, META_GOERLI_PK1);
  console.log('🚀 ~ file: encryptKey.js ~ line 8 ~ encryptedJsonKey', encryptedJsonKey)
  fs.writeFileSync('.encryptedKey.json', encryptedJsonKey);
};

main()
