import React, { useState } from "react";

const CandidateCard = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [votes, setVotes] = useState(0);

  // Function to connect with MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setWalletConnected(true);
        setVotes(10);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert(
        "MetaMask is not installed. Please install MetaMask and try again."
      );
    }
  };

  return (
    <div>
        <a href="/">home</a>
      {!walletConnected ? (
        <>
          <p>connect wallet</p>
          <button onClick={connectWallet}>Connect MetaMask</button>
        </>
      ) : (
        <>
          <h1>Hi, candidate!</h1>
          <p>Wallet: {account}</p>
          <p>no of votes: {votes}</p>
        </>
      )}
    </div>
  );
};

export default CandidateCard;
