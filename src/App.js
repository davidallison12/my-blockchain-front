import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { getContractAddress } from "ethers/lib/utils";
import abi from "./utils/PokePortal.json";
import { utils } from "hash.js";

export default function App() {
  // Adding state variable to store user's public wallet
  const [currentAccount, setCurrentAccount] = useState("");

  // Create a variable that holds the contract addresss of deployment
  const contractAddress = "0xA94AA3d7400a071718C87e5bE477c1750EA13B8D";

  // Create variable that refs abi content
  const contractABI = abi.abi;

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
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const pokePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await pokePortalContract.getTotalPokeTeams();
        console.log("Retrieved total wave count ...", count.toNumber());

        // Execute the actual "Wave" from your smart contract
        const pokeTxn = await pokePortalContract.newPokeTeam();
        console.log("Mining...", pokeTxn.hash);

        await pokeTxn.wait();
        console.log("Mined --", pokeTxn.hash);

        console.log("Retrieved total wave count...", count.toNumber());

        count = await pokePortalContract.getTotalPokeTeams();
        console.log("Retrieved total wave count ...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Runs our function when the page loads
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

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
