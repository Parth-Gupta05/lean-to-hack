import React, { useState } from "react";

const VoterCard = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [voteCast, setVoteCast] = useState(false);
  const [confirmedCandidate, setConfirmedCandidate] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setWalletConnected(true);
      } catch (error) {
        console.error(
          "User rejected the connection or there was an error:",
          error
        );
      }
    } else {
      alert(
        "MetaMask is not installed. Please install MetaMask and try again."
      );
    }
  };

  const handleVote = () => {
    if (!selectedCandidate) {
      alert(" select candidate.");
      return;
    }
    const confirmVote = window.confirm(
      `Are you sure you want to vote for ${selectedCandidate}?`
    );
    if (confirmVote) {
        setVoteCast(true);
        setConfirmedCandidate(selectedCandidate);
    }
  };

  if (voteCast) {
    return (
      <div>
        <a href="/">home</a>
        <h1>casted!</h1>
        <p> voted for: {confirmedCandidate}</p>
      </div>
    );
  }

  return (
    <div>
      <a href="/">home</a>
      {!walletConnected ? (
        <>
          <p> login with wallet</p>
          <button onClick={connectWallet}>Connect metamask</button>
        </>
      ) : (
        <>
          <h1>Hi, voter!</h1>
          <p>Wallet Connected: {account}</p>
          <div>
            <label htmlFor="candidate-select">Select a candidate:</label>
            <select
              id="candidate-select"
              value={selectedCandidate}
              onChange={(e) => setSelectedCandidate(e.target.value)}
            >
              <option value="">select </option>
              <option value="Candidate A"> A</option>
              <option value="Candidate B"> B</option>
              <option value="Candidate C"> C</option>
            </select>
          </div>
          <button onClick={handleVote}>Vote</button>
        </>
      )}
    </div>
  );
};

export default VoterCard;
