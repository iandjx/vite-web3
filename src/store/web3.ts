import { create } from "zustand";

import { devtools } from "zustand/middleware";
import { Web3Provider } from "@ethersproject/providers";

import { Contract } from "@ethersproject/contracts";

const ERC20ABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];
interface Web3 {
  account?: string;
  provider?: Web3Provider;
}
interface Web3State {
  web3: Web3;
  setWeb3Store: (arg: Web3) => void;
  getDecimals: () => void;
  decimals: string;
  symbol: string;
  actions: {
    getBalance: () => void;
    getSymbol: () => void;
  };
}

export const useWeb3Store = create<Web3State>(
  //@ts-ignore
  devtools((set, get) => ({
    web3: {},
    setWeb3Store: (web3) =>
      set(() => ({
        web3,
      })),
    getDecimals: async () => {
      const { account, provider } = get().web3;

      if (!account || !provider) {
        return;
      }
      const contract = new Contract(
        "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        ERC20ABI,
        provider.getSigner(account)
      );
      const decimals = await contract.decimals();

      set((state) => {
        return { ...state, decimals };
      });
    },

    actions: {
      getSymbol: async () => {
        const { account, provider } = get().web3;

        if (!account || !provider) {
          return;
        }
        const contract = new Contract(
          "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          ERC20ABI,
          provider.getSigner(account)
        );
        const symbol = await contract.symbol();
        set((state) => {
          return { ...state, symbol };
        });
      },
      getBalance: async () => {
        const { account, provider } = get().web3;

        if (!account || !provider) {
          return;
        }
        const contract = new Contract(
          "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          ERC20ABI,
          provider.getSigner(account)
        );
        const balance = await contract.balanceOf(account);
        set((state) => {
          return { ...state, balance };
        });
      },
    },
  }))
);
