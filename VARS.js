import dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export const {
  GANACHE_RPC_URL,
  MAIN_WALLET,
  GANACHE_PK1,
  GANACHE_WALLET1,
  GOERLI_RPC_URL,
  META_GOERLI_PK1,
  ALCH_RPC_URL,
  PK1_PW
} = process.env;
