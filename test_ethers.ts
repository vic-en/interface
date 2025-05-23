// ethers v6
import { providers } from 'ethers';

// Replace with your RPC URL (Infura, Alchemy, or local node)
const rpcUrl = 'https://rpc.mainnet.wonderchain.org';

const provider = new providers.JsonRpcProvider(rpcUrl);

async function getBlockNumber() {
  const blockNumber = await provider.getBlockNumber();
  console.log('Current block number:', blockNumber);
  const a = await provider.ready;
  console.log('Ready:', a);
}

getBlockNumber();