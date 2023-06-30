import React, { useState, useEffect } from "react";
import Web3 from "web3";
import nUSDAbi from "./nUSD.json";// Contract ABI importing
//import AggregatorV3InterfaceAbi from "./AggregatorV3Interface.json";
const contractAddress = "0x42Ed74BA0a03a4fCD0e06bBB575988137e21a4db"; // Contract address from deployment

function App() {
  const [nusdContract, setNusdContract] = useState(null);
  const [ethAmount, setethAmount] = useState(0);
  const [nusdValue, setNusdValue] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  // const [bal,setBal]=useState("");
  
  

  // Initialize Web3 ,contract instance
  useEffect(() => {
    async function initialize() {
      if (window.ethereum) {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(nUSDAbi.abi, contractAddress);
        setNusdContract(contract);

        // display total supply using oppenzepplin function
        const supply = await contract.methods.totalSupply().call();
        
        setTotalSupply(supply.toString());

        //display wallet nUSD balance
        const accounts = await web3.eth.getAccounts();
        const bal = await contract.methods.balanceOf(accounts[0]).call();// using oppenzepplin balanceof function
        //setBal(bal.toString());


        
        
      } else {
        console.log("Please install MetaMask");
      }
    }
    initialize();
  }, []);

  // Handle deposit ETH
  const handleDeposit = async () => {
    
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const weiAmount = web3.utils.toWei(ethAmount.toString(), "ether");
      
      await nusdContract.methods.depositETH(weiAmount).send({
        from: accounts[0],
        value: weiAmount,
      });

      // Update the total supply and wallet balance
      const supply = await nusdContract.methods.totalSupply().call();
      setTotalSupply(supply.toString());
      const balance = await nusdContract.methods.balanceOf(accounts[0]).call();
      // setBal(balance.toString());
    } catch (error) {
        console.error("Error depositing ETH:", error);
      }
    
  };

  // Handle redeem nUSD
  const handleRedeem = async () => {
  
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const gasLimit = 800000; // Increase the gas limit as per your requirements
      
      await nusdContract.methods.redeemETH(nusdValue).send({
        from: accounts[0],
        value: nusdValue,
        gas: gasLimit,
      });
        //setTotalSupply(supply.toString());
        const bal = await nusdContract.methods.balanceOf(accounts[0]).call();
        // setBal(bal.toString());
      } catch (error) {
        console.error("Error redeeming nUSD:", error);
      }
    }
  ;

  return (
    <div className="App">
      <h1>nUSD Stablecoin</h1>
      <p>Total Supply: {totalSupply} nUSD</p>
      
     
      <div>
        <label>Deposit ETH:</label>
        <input
          type="number"
          value={ethAmount}
          onChange={(e) => setethAmount(e.target.value)}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>
      <div>
        <label>Redeem nUSD:</label>
        <input
          type="number"
          value={nusdValue}
          onChange={(e) => setNusdValue(e.target.value)}
        />
        <button onClick={handleRedeem}>Redeem</button>
      </div>
    </div>
  );
}

export default App;
