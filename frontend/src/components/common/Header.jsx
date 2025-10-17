import { Link } from 'react-router-dom';

const Header = ({ walletAddress = '0x1a2b3c4d5e6f' }) => {
  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="border-b-2 border-vintage-white bg-vintage-black py-4 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-mono uppercase tracking-wider">FlashAd</h1>
          <Link to="/" className="text-sm font-mono text-vintage-gray-600 hover:text-vintage-white transition-colors">
            ← Home
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="px-4 py-2 border border-vintage-gray-400 font-mono text-xs uppercase tracking-wider">
            {truncateAddress(walletAddress)}
          </span>
          <button className="px-4 py-2 border-2 border-vintage-white bg-vintage-white text-vintage-black font-mono text-xs uppercase tracking-wider hover:bg-transparent hover:text-vintage-white transition-all">
            Disconnect
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
