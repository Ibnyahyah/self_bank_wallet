import {useState, useEffect} from 'react'
import { IoIosRefresh } from 'react-icons/io'
import { getBalance, depositEth, withdrawEth } from '../utils/bankFuntions'

export default function BankInfo({ onAccountChange }){
    const [balanceINR, setBalanceINR] =useState(0);
    const [balanceETH, setBalanceETH] = useState(0);
    const [showDeposit, setShowDeposit] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [exhRate, setExhRate] = useState(0)
    const [inputETH, setInputETH] = useState(null);
    const [inputINR, setInputINR] = useState(null);
    const [response, setResponse] = useState(null)

    function handleShowDeposit(){
        setShowDeposit(true)
    }
    function handleShowWithdraw(){
        setShowWithdraw(true)
    }
    function handleClose(){
        setShowWithdraw(false);
        setShowDeposit(false);
        setInputETH(null);
        setResponse(null);
        setResponse(null);
    }

    const checkBalance = async () => {
        const balance = await getBalance();
        setBalanceETH(balance.eth);
        setBalanceINR(balance.inr);
        setExhRate(balance.exhRate);   
    }
    function handleInoutINR(e){
        setInputINR(e.target.value);
        setInputETH((e.target.value / exhRate).toFixed(18));
    }

    const handleDeposit = async() =>{
        setResponse(null);
        const deposit = await depositEth(inputETH.toString());
        setInputETH(null);
        setInputINR(null);
        setResponse(deposit.status)
    }
    const handleWithdraw =async()=>{
        if(inputINR>balanceINR){
            setResponse('Insufficient Balance');
        }else{
            setResponse(null);
            const withdraw = await withdrawEth(inputETH.toString());
            setInputETH(null);
            setInputINR(null);
            setResponse(withdraw.status);
        }
    }

    useEffect(()=>{
        checkBalance()
    },[onAccountChange])
    return(
        <div className="main-body">
            <div className="card bg-white balance">
                    <h1>
                        Save Balance
                        <IoIosRefresh className="refresh-icon ml-1 text-green" onClick={checkBalance}/>
                    </h1>
                <div className="row mt-1 justify-space-between">
                    <div>
                        <h3 className="text-gray-light-2 font-md">{parseFloat(balanceINR).toFixed(2)} INR</h3>
                        <h3 className="font-md">{parseFloat(balanceETH).toFixed(4)} ETH</h3>
                    </div>
                    {!showDeposit && !showWithdraw &&(
                        <div>
                            <button className="btn btn-blue text-white m-1" onClick={handleShowDeposit}>
                                Deposit
                            </button>
                            <button className="btn btn-red text-white m-1" onClick={handleShowWithdraw}>
                                Withdraw
                            </button>
                        </div>
                    )}
                </div>
                {showDeposit || showWithdraw?(
                    <>
                        <div className="row justify-space-between">
                            <div className="mt-1">
                            <b>INR</b><br/>
                                <input
                                    placeholder="Enter Amount in INR"
                                    type="number"
                                    value={inputINR > 0 ? inputINR : ''}
                                    onChange={handleInoutINR}
                                    />
                            </div>
                            <div className="mt-1">
                                <b>ETH</b><br/>
                                <input
                                placeholder="ETH Equivalent"
                                type="number"
                                value={inputETH > 0 ? inputETH : ''}
                                readOnly
                                />
                            </div>
                            <div>
                                <button className="btn p-1 m-1" onClick={showDeposit? handleDeposit: handleWithdraw}>
                                    {showDeposit?'Deposit':'Withdraw'}
                                </button>
                                <button className="btn-red text-white m-1 p-1" onClick={handleClose}>Close</button>
                            </div>
                        </div>
                        {response&&(
                        <>
                            <div className="display-f justify-center align-center mt-2 mb-1">
                                <div className="col-6-sm">
                                    <div className="alert-card">{response}</div>
                                </div>
                            </div>
                        </>
                        )}
                    </>
                ):null}
            </div>
        </div>
    )
}