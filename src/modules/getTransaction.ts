import { AmmoToken__factory } from "./../typechain/factories/AmmoToken__factory";
import { ethers } from "ethers";

export const getTransaction = async (txHash: string) => {
  const rpc = "https://rpc-testnet.bitkubchain.io";
  const tokenAddress = "0x5F1d19B1C3aA4000Afdc1fCB402d916200841aE4";
  const wss = "wss://wss-testnet.bitkubchain.io";

  const wsProvider = new ethers.providers.WebSocketProvider(wss);
  const txWss = await wsProvider.getTransaction(txHash);

  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const txRpc = await provider.getTransaction(txHash);

  const iface = new ethers.utils.Interface(AmmoToken__factory.abi);

  // Decode Function Data
  const result = iface.decodeFunctionData("transfer", txRpc.data);
  console.log("Result", result);
  console.log("Result", ethers.utils.formatEther(result[1]));
};
