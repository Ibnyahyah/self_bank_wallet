import React from 'react';
import './App.css';
import BankInfo from './components/BankInfo';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import StatusBox from './components/StatusBox';

function App() {

  const [status, setStatus] = React.useState('');
  const [connected, setConnected] = React.useState();
  const [wallet, setWallet] = React.useState();

  return (
    <>
      <Navbar
        setStatus={setStatus}
        setConnected={setConnected}
        setWallet={setWallet}
      />
      <StatusBox status={status}/>
      {connected&&<BankInfo onAccountChange={wallet}/>}
      <Footer/>
    </>
  );
}

export default App;
