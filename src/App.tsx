import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import logo from './assets/logo_white.png';
import RewardTable from './components/RewardTable';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { environment } from './environments/environment.prod';
import ConnectWallet from './components/ConnectWallet';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
