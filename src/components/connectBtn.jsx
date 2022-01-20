import React from 'react';
import { connectWallet, getWalletStatus } from '../utils/walletConnect';

export default function ConnectBtn({setStatus, setConnected, setWallet}){

    const [walletAddress, setWalletAddress] = React.useState('');

    const handleConnect = async()=>{
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWalletAddress(walletResponse.address);
        setWallet(walletResponse.address);
    }

    React.useEffect(()=>{
        const checkWalletStatus =async()=>{
            const walletResponse = await getWalletStatus();
            setStatus(walletResponse.status);
            setConnected(walletResponse.connected);
            setWalletAddress(walletResponse.address);
            setWallet(walletResponse.address);
        }
        const walletListener = ()=>{
            if(window.ethereum){
                window.ethereum.on('accountsChanged', (accounts)=>{
                    checkWalletStatus()
                })
            }
        }
        
        checkWalletStatus();
        walletListener()
    },[setStatus, setConnected, setWallet]);

    return(
        <div>
            <button onClick={handleConnect} className="btn bg-gray-light-1">
                {walletAddress.length === 0
                ? 'Coonect Wallet'
                :'Connected '+ 
                String(walletAddress).substring(0,6) +
                '...' + 
                String(walletAddress).substring(38)
                }
            </button>
        </div>
    )
}