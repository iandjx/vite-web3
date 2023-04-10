import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CoinbaseWalletCard from "./components/connectorCards/CoinbaseWalletCard";
import GnosisSafeCard from "./components/connectorCards/GnosisSafeCard";
import MetaMaskCard from "./components/connectorCards/MetaMaskCard";
import NetworkCard from "./components/connectorCards/NetworkCard";
import WalletConnectCard from "./components/connectorCards/WalletConnectCard";
import WalletConnectV2Card from "./components/connectorCards/WalletConnectV2Card";
import ProviderExample from "./components/ProviderExample";

function App() {
  return (
    <div className="App">
      <ProviderExample />
    </div>
  );
}

export default App;
