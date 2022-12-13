import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import logo from './assets/logo_white.png';
import RewardTable from './components/RewardTable';
// Import the functions you need from the SDKs you need
import { environment } from './environments/environment.prod';
import ConnectWallet from './components/ConnectWallet';


import Plausible from 'plausible-tracker';

const { trackPageview ,enableAutoPageviews } = Plausible()
trackPageview()
enableAutoPageviews();

function App() {

  return (
    <div className="App">

      {/* <SideMenu/> */}
      <ConnectWallet/>
                  <span id='love'>built with LOVE by <a href="https://avaulto.com" target="_blank"><img src={logo} alt='avaulto logo'/></a></span><br/>
    </div>
  );
}

export default App;
