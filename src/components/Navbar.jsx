import { Coins } from 'lucide-react';
import { useState, useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import { Search } from 'lucide-react';
export default function Navbar() {

    const [input, setInput] = useState("");
    const [filteredCoins, setFilteredCoins] = useState([])
    const { cryptoList = [], setSearchTerm } = useContext(CryptoContext);

    const inputHandler = (event) => {
        const value = event.target.value;
        setInput(value);
        if (value === "") {
            setSearchTerm("");
            setFilteredCoins([]);
        }
        else {
            const suggestions = cryptoList.filter((coin) => coin.name.toLowerCase().includes(value.toLowerCase()))
            // console.log(suggestions);
            setFilteredCoins(suggestions.slice(0, 5));
        }
    }


    const searchHandler = (event) => {
        event.preventDefault();
        setSearchTerm(input);
        setFilteredCoins([]);
    }

    return (
        <nav className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 px-[5%] md:px[8%] lg:px[]10%
        py-5 bg-blue-900/80 backdrop-blur-md border-b border-blue-700/30 sticky top-0 z-50">
            <a href="/" className="order-1 flex-shrink-0 flex items-center gap-2 hover:scale-105 transition-transform">
                <Coins className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_8px_rgba(10,25,47,0.9)]" />
                <span className='text-xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent'>
                    CryptoMetrics
                </span>
            </a>

            {/* SEARCH */}


            <form onSubmit={searchHandler} className='order-3 w-full md:order-2 md:w-auto flex-1 max-w-2xl mx-0 md:mx-4 relative'>
                <div className='relative group'>
                    <div className='absolute inset-0.5 bg-gradient-to-r from-emerald-600/40 to-cyan-500/40 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300'></div>

                    <div className='relative flex items-center'>
                        <input
                            type="text"
                            placeholder='Search crypto'
                            value={input}
                            onChange={inputHandler}
                            required
                            className='w-full px-6 py-3 pr-12 bg-gray-800/60 border border-blue-600/30 rounded-full
                            focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder-gray-400 text-gray-200 
                            backdrop-blur-sm'
                        />

                        <button
                            type='submit'
                            className='absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-emerald-600 
                            to-cyan-600 text-white 
                            rounded-full hover:scale-105 transition-all'
                        >
                            <Search className="w-4 h-4 pointer-events-none" />
                        </button>
                    </div>
                </div>
                {filteredCoins.length>0 &&(
                    <ul className='absolute w-full bg-gray-800/95 border border-gray-700 mt-2 rounded-lg 
                    shadow=xl z-10 backdrop-blur-md'>
                        {filteredCoins.map((coin,idx)=>(
                            <li key={idx} className='px-4 py-2 hover:bg-emerald-600/30 cursor-pointer text-gray-100 '
                            onClick={()=>{
                                setInput(coin.name);
                                setFilteredCoins([]);
                            }}>
                                {coin.name}

                            </li>
                        ))}

                    </ul>
                )}
            </form>

        </nav>
    )
}