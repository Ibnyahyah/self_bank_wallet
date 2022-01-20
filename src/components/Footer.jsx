import { IoIosInformationCircleOutline } from 'react-icons/io'

const Footer = () => {
  return (
    <footer className="bg-black p-1 text-white text-center">
      <p className="footer-text">
        <IoIosInformationCircleOutline className="info-icon" /> This application
        in running on ropsten test network. Please only use test Ethers.
      </p>
    </footer>
  )
}

export default Footer