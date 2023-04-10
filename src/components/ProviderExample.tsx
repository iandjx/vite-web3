import type { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import type { Network } from "@web3-react/network";
import type { WalletConnect } from "@web3-react/walletconnect";
import type { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";

import {
  coinbaseWallet,
  hooks as coinbaseWalletHooks,
} from "../connectors/coinbaseWallet";
import { hooks as metaMaskHooks, metaMask } from "../connectors/metaMask";
import { hooks as networkHooks, network } from "../connectors/network";
import {
  hooks as walletConnectHooks,
  walletConnect,
} from "../connectors/walletConnect";
import {
  hooks as walletConnectV2Hooks,
  walletConnectV2,
} from "../connectors/walletConnectV2";
import { getName } from "../utils";
import { useEffect } from "react";
import { useWeb3Store } from "../store/web3";

const connectors: [
  MetaMask | WalletConnect | WalletConnectV2 | CoinbaseWallet | Network,
  Web3ReactHooks
][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [walletConnectV2, walletConnectV2Hooks],
  [coinbaseWallet, coinbaseWalletHooks],
  // [network, networkHooks],
];

function Child() {
  const { connector, provider, account } = useWeb3React();
  const setWeb3Store = useWeb3Store((state) => state.setWeb3Store);
  const web3 = useWeb3Store((state) => state.web3);
  const getDecimals = useWeb3Store((state) => state.getDecimals);
  const { actions } = useWeb3Store();

  useEffect(() => {
    if (provider && account) {
      setWeb3Store({
        account,
        provider,
      });
    }
  }, [provider, account]);

  useEffect(() => {
    if (web3.account && web3.provider) {
      getDecimals();
    }
  }, [web3.account, web3.provider]);
  useEffect(() => {
    async function loadData() {
      //@ts-ignore
      const promises = Object.keys(actions).map((action) => actions[action]());
      await Promise.all(promises);
    }
    if (web3.account && web3.provider) {
      console.log("account change");
      loadData();
    }
  }, []);
  console.log("connector", connector);
  return (
    <button
      onClick={() => {
        connector.activate && connector.activate();
      }}
    >
      connect to metamask
    </button>
  );
}

export default function ProviderExample() {
  const account = useWeb3Store((state) => state.web3.account);
  return (
    <Web3ReactProvider connectors={connectors}>
      {account}
      <Child />
    </Web3ReactProvider>
  );
}
