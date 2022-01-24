import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

export default function App() {
  // Adding state variable to store user's public wallet
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      // First make sure we have access to window.ethereum

      const { ethereum } = window; // Equivalent to "window.ethereum"

      if (!ethereum) {
        console.log("Make sure you have metamask!");
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      // Check if we're authorized to access user's wallet

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Implement your connect Wallet method
  const connectWallet = async () => {
    try {
      const {ethereum} = window

      if(!ethereum) {
        alert("Get MetaMask!")
        return
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" })
      console.log("Connected", accounts[0])

    } catch (error) {
      console.log(error)
    }
  }


  // Runs our function when the page loads
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const wave = () => {};

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          👋🏾 Hey there! Welcome to PokePortal{" "}
          <img
            className="emojidex-emoji"
            src="https://cdn.emojidex.com/emoji/seal/Pokeball.png"
            emoji-code="Pokeball"
            alt="Pokeball"
          />
        </div>

        <div className="bio">
          I am david and I am a blockchain enthusiast. Connect your Ethereum
          wallet and let me know your ride or die Pokemon team!
        </div>

        <div className="inputContainer">
          <input type="text" id="pokename" name="pokename" required size="50" />

          <button className="waveButton" onClick={wave}>
            Wave at Me
          </button>
        </div>

        {/* If no current account render this button */}
        {!currentAccount && (
          <button className="connectButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
