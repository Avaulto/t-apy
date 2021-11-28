import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {Connection, clusterApiUrl, Cluster, PublicKey, InflationReward} from '@solana/web3.js'
import RewardTable from './RewardTable';
function App() {

  return (
    <div className="App">
      validator reward
      <RewardTable/>
    </div>
  );
}

export default App;
