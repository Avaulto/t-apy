import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import logo from './assets/logo_white.png';
import RewardTable from './components/RewardTable';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import SideMenu from './components/SideMenu';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {

  return (
    <div className="App">

      {/* <SideMenu/> */}
      <span id="table-title">
       SOL reward history
        </span>
      <RewardTable/>
                  <span id='love'>built with LOVE by <a href="https://avaulto.com" target="_blank"><img src={logo} alt='avaulto logo'/></a></span><br/>
    </div>
  );
}

export default App;
