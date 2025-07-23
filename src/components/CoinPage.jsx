
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { CryptoContext } from "../context/CryptoContext";
import AreaChart from "./AreaChart";
import { ArrowUp,ArrowDown } from "lucide-react";
export default function CoinPage() {
    const { cryptoId } = useParams();
    const [coinDetails, setCoinDetails] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [period, setPeriod] = useState('10');
    const [error, setError] = useState(null);

    const { currentCurrency } = useContext(CryptoContext);

    const requestOptions = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': 'CG-ecJ3DrhR4E8D94qEgLFvzVDg'
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            try {
                const detailsRes = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`, requestOptions);
                if (!detailsRes.ok) throw new Error(`Error fetching coin details: ${detailsRes.statusText}`);
                setCoinDetails(await detailsRes.json());

                const chartRes = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=${currentCurrency.name}&days=${period}&interval=daily`,
                    requestOptions
                );
                if (!chartRes.ok) throw new Error(`Error fetching chart data: ${chartRes.statusText}`);
                setChartData(await chartRes.json());

            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        };
        fetchData();
    }, [currentCurrency, cryptoId, period]);

    if (error) {
        return (
            <div className="text-red-500 text-center py-4">
                <p>{error}</p>
            </div>
        );
    }

    if (!coinDetails || !chartData) {
        return (
            <div className="text-center text-gray-300 py-10">
                <p>Loading coin data...</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto text-white">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <img src={coinDetails.image?.large} alt={coinDetails.name} className="w-24 h-24" />
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold">{coinDetails.name}</h1>
                    <p className="text-gray-400 text-sm uppercase">({coinDetails.symbol})</p>
                    <p className="text-emerald-400 text-sm">Rank: #{coinDetails.market_cap_rank}</p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-gray-800/40 p-6 rounded-xl backdrop-blur-md border border-emerald-500/20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h2 className="text-xl font-semibold">
                        {currentCurrency.symbol} Price Chart
                    </h2>
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="bg-gray-900 border border-cyan-500 text-white px-4 py-2 rounded-lg focus:outline-none"
                    >
                        <option value="1">24H</option>
                        <option value="7">7D</option>
                        <option value="10">10D</option>
                        <option value="30">1M</option>
                        <option value="90">3M</option>
                        <option value="365">1Y</option>
                    </select>
                </div>

                {/* Chart Component */}
                <div className="w-full h-[400px]">
                    <AreaChart
                        historical={chartData}
                        currentCurrency={currentCurrency.symbol}

                    />
                </div>
            </div>

            <div>
                <div className="mt-8 grid md:grid-cols-2 gap-6 text-sm sm:text-base">
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-emerald-500/10">
                        <span className="text-gray-400 block mb-1">Current Price</span>
                        <span className="text-lg font-semibold text-white">
                            {currentCurrency.symbol}
                            {coinDetails?.market_data?.current_price?.[currentCurrency.name.toLowerCase()]?.toLocaleString() || 'N/A'}
                        </span>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-xl border border-cyan-500/10">
                        <span className="text-gray-400 block mb-1">Market Cap</span>
                        <span className="text-lg font-semibold text-white">
                            {currentCurrency.symbol}
                            
                            {coinDetails?.market_data?.market_cap?.[currentCurrency.name.toLowerCase()]?.toLocaleString() || 'N/A'}
                        </span>
                    </div>

                    
                </div>

            </div>
            <div>
                <div className="mt-8 grid md:grid-cols-2 gap-6 text-sm sm:text-base">
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-emerald-500/10">
                        <span className="text-gray-400 block mb-1">24H High</span>
                        <span className="text-lg font-semibold text-green-400 flex items-center">
                            <ArrowUp className="w-4 h-4 mr-1"/>
                            {currentCurrency.symbol}
                            {coinDetails?.market_data?.high_24h?.[currentCurrency.name.toLowerCase()]?.toLocaleString() || 'N/A'}
                        </span>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-xl border border-cyan-500/10">
                        <span className="text-gray-400 block mb-1">24H Low</span>
                        <span className="text-lg font-semibold text-red-400 flex items-center">
                            <ArrowDown className="w-4 h-4 mr-1"/>&nbsp;
                            {currentCurrency.symbol}
                            
                            {coinDetails?.market_data?.low_24h?.[currentCurrency.name.toLowerCase()]?.toLocaleString() || 'N/A'}
                        </span>
                    </div>
                    
                </div>


            </div>

            <div>
                <div className="mt-8 grid md:grid-cols-2 gap-6 text-sm sm:text-base">
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-emerald-500/10">
                        <span className="text-gray-400 block mb-1">24h Change</span>
                        <span className="text-lg font-semibold text-green-400 flex items-center">
                            
                            {coinDetails?.market_data.price_change_percentage_24h.toFixed(2)}%
                            {coinDetails?.market_data.price_change_percentage_24h>0?(
                                <ArrowUp className="w-4 h-4 text-green-400"></ArrowUp>
                            ):(
                                <ArrowDown className="w-4 h-4 text-red-400"/>
                            )
                            }
                        </span>
                       
                            
                           
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-xl border border-cyan-500/10">
                        <span className="text-gray-400 block mb-1">24h Volume</span>
                        <span className="text-lg font-semibold ">
                           
                            {currentCurrency.symbol}
                            
                            {coinDetails?.market_data.total_volume?.[currentCurrency.name.toLowerCase()]?.toLocaleString() || 'N/A'}
                        </span>
                    </div>
            </div>
        </div>
        </div>
    );
}
