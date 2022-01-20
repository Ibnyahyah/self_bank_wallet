import ConnectBtn from "./connectBtn";

export default function Navbar({setStatus, setWallet, setConnected}){
    return(
        <div className="navbar navbar-white">
            <nav className="navbar container">
                <header>Self Bank & wallet.me</header>
                <ConnectBtn setStatus={setStatus} setWallet={setWallet} setConnected={setConnected}/>
            </nav>
        </div>
    )
}