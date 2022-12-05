import { useState, useEffect } from "react";
import { ethers } from "ethers";

function App() {
  const [currentMood, setCurrentMood] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [inputText, setInputText] = useState("");

  const contractAddress = "0x4DD721098E76b43Bb6772E9Fa61BF8430A0CCc0f";
  const moodABI = [
    {
      inputs: [
        {
          internalType: "string",
          name: "_mood",
          type: "string",
        },
      ],
      name: "setMood",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getMood",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Please install metamask");
        return;
      } else {
        console.log("we have object ethereum", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
      } else {
        console.log("no authorised accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getBlockchainMood = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "goerli");
        const signer = provider.getSigner();
        const moodContract = new ethers.Contract(
          contractAddress,
          moodABI,
          signer
        );
        const blockchainMood = await moodContract.getMood();
        setCurrentMood(blockchainMood);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setBlockchainMood = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "goerli");
        const signer = provider.getSigner();
        const moodContract = new ethers.Contract(
          contractAddress,
          moodABI,
          signer
        );
        await moodContract.setMood(inputText);
        setCurrentMood(inputText);
        setInputText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <h1>Write data to the blockchain!</h1>
      <div>
        <p>Get or set the current mood: </p>
        <label htmlFor="mood">Input moood: </label>
        <input
          id="mood"
          type="text"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        ></input>
        <div>
          <button onClick={setBlockchainMood}>Set Mood</button>
        </div>
        <div>
          <button onClick={getBlockchainMood}>Get Mood</button>
        </div>
      </div>
      <div>
        {!currentAccount && (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>
      <div>{currentMood && <div>Current mood is {currentMood} </div>}</div>
    </div>
  );
}

export default App;
