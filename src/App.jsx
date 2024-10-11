import './App.css'
import { ethers } from "ethers";
import priceABI from "../abi/price.json";
import { useState, useRef, } from "react";


function App() {
  const amountRef = useRef();
  const amountRef1 = useRef();
  const amountRef2 = useRef();


  const [amount, setAmount] = useState(0);
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);

  const priceAddress = "0x5B48cE6d5638063F7c6ADFdCf556577f7555f8C9";

  const createGetContract = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum)
    const priceContract = new ethers.Contract(priceAddress, priceABI.abi, provider);
    return priceContract;
  };


  const getBTCETH = async () => {
    const contract = await createGetContract();
    const amount = await contract.convertBTCtoETH(Number(amountRef.current.value));
    setAmount(Number(amount) / 10 ** 18);
  };

  const getBTCUSD = async () => {
    const contract = await createGetContract();
    const amount = await contract.convertBTCtoUSD(Number(amountRef1.current.value));
    setAmount1(Number(amount) / 10 ** 18);
  };

  const getETHUSD = async () => {
    const contract = await createGetContract();
    const amount = await contract.convertETHtoUSD(Number(amountRef2.current.value));
    setAmount2(Number(amount) / 10 ** 18);
  };



  return (
    <>
      <h1> Price Conversion App </h1>

      <div>
        <div className='options'>
          <div className='text1'>BTC - ETH</div>
          <input ref={amountRef} className='input1' placeholder='Enter Amount in BTC' />
          <input value={amount} className='input1' placeholder='Result in ETH' />
          <button onClick={getBTCETH} className='but1'>Convert to ETH</button>
        </div>

        <div className='options'>
          <div className='text1'>BTC - USD</div>
          <input ref={amountRef1} className='input1' placeholder='Enter Amount in BTC' />
          <input className='input1' value={amount1} placeholder='Result in USD' />
          <button onClick={getBTCUSD} className='but1'>Convert to USD</button>
        </div>

        <div className='options'>
          <div className='text1'>ETH - USD</div>
          <input ref={amountRef2} className='input1' placeholder='Enter Amount in ETH' />
          <input value={amount2} className='input1' placeholder='Result in USD' />
          <button onClick={getETHUSD} className='but1'>Convert to USD</button>
        </div>


      </div>
    </>
  )
}

export default App
