import * as React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const wave = () => {
    
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
       👋🏾 Hey there! Welcome to PokePortal <img class="emojidex-emoji" src="https://cdn.emojidex.com/emoji/seal/Pokeball.png" emoji-code="Pokeball" alt="Pokeball" />
        </div>

        <div className="bio">
        I am david and I am a blockchain enthusiast. Connect your Ethereum wallet and let me know your ride or die Pokemon team!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}
