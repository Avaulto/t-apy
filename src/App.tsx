import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import logo from './assets/solanahub-logo.svg';
import RewardTable from './components/RewardTable';
// Import the functions you need from the SDKs you need
import { environment } from './environments/environment.prod';
import ConnectWallet from './components/ConnectWallet';




function App() {

  return (
    <div className="App">

      {/* <SideMenu/> */}
      <ConnectWallet/>
      <span id="love">built with Love by <a href="https://www.SolanaHub.app" target="_blank">
        <span id="logo">SolanaHub</span>
        <img src={logo} alt="solanhub logo"/></a>
      </span>
    </div>
  );
}

export default App;
