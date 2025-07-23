
import { useContext, useState } from "react";
import { CryptoContext } from "../context/CryptoContext";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function CoinArea() {
    const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
    const { filteredCryptos, currentCurrency, setCurrentCurrency } = useContext(CryptoContext);

    const handleCurrencySelect = (selectedCurrency) => {
        switch (selectedCurrency) {
            case "USD":
                setCurrentCurrency({ name: "USD", symbol: "$" });
                break;
            case "EUR":
                setCurrentCurrency({ name: "EUR", symbol: "€" });
                break;
            case "INR":
                setCurrentCurrency({ name: "INR", symbol: "₹" });
                break;
            default:
                setCurrentCurrency({ name: "USD", symbol: "$" });
        }
        setIsCurrencyDropdownOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-gray-900/50 to-[#0a192f] text-white px-4 sm:px-[5%] py-6 md:py-10 relative z-0">

            {/* Head Section */}
            <div className="text-center mb-8 md:mb-12 space-y-4 group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 blur-3xl opacity-30 animate-pulse" />

                <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-emerald-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent leading-tight drop-shadow-md">
                    Crypto
                    <br />
                    <span className="block mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl bg-gradient-to-br from-cyan-400 to-emerald-400 bg-clip-text text-transparent font-semibold">
                        Insights Hub
                    </span>
                </h1>

                <p className="text-gray-300/80 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed mt-4">
                    Track live market trends, dive into analytics, and leverage AI-powered predictions for
                    <span className="bg-gradient-to-r from-emerald-400/50 to-cyan-400/80 bg-clip-text text-transparent mx-2">
                         smarter investing.
                    </span>
                </p>
            </div>

            {/* Task Header */}

            <div className="hidden md:grid grid-cols-5 gap-4 text-sm py-4 px-4 mb-2 bg-gray-800/40 backdrop-blur-lg rounded-full border border-emerald-500/20 text-center">
                <p className="text-emerald-400/90 text-left">Rank</p>
                <p className="text-cyan-400/90 text-left">Coins</p>
                <div
                    className="relative flex justify-center items-center gap-1 cursor-pointer group"
                    onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                >
                    <span>Price</span>
                    <div className="flex items-center gap-1">
                        <span className="text-emerald-400/90">({currentCurrency.symbol})</span>
                        <ChevronDown
                            className={`w-4 h-4 text-cyan-400/80 transition-transform ${isCurrencyDropdownOpen ? "rotate-180" : ""}`}
                        />
                    </div>
                </div>
                <p className="text-emerald-400/90 text-center">24H Flux</p>
                <p className="text-cyan-400/90 text-right">Market Cap</p>
            </div>


            {/* Currency Dropdown */}
            {isCurrencyDropdownOpen && (
                <div className="absolute top-[260px] left-[12px] sm:left-[5%] bg-gray-800/95 backdrop-blur-xl rounded-lg border border-emerald-500/20 shadow-2xl z-50 w-48">
                    {["USD", "EUR", "INR"].map((code) => (
                        <div
                            key={code}
                            className="px-4 py-3 hover:bg-emerald-600/30 transition-colors cursor-pointer flex items-center gap-2"
                            onClick={() => handleCurrencySelect(code)}
                        >
                            <span className="text-emerald-400/80">
                                {code === "USD" ? "$" : code === "EUR" ? "€" : "₹"}
                            </span>
                            <span className="text-gray-100">{code.toUpperCase()}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Coin List */}
            <div className="space-y-3 relative z-10 mt-6">
                {filteredCryptos.slice(0, 20).map((item) => (
                    <Link
                        to={`/crypto/${item.id}`}
                        key={item.id}
                        className="block p-4 bg-gray-800/30 backdrop-blur-md hover:bg-gray-700/40 border border-emerald-500/10 hover:border-cyan-500/30 transition-all duration-300 group rounded-xl"
                    >
                        {/* Desktop Grid */}


                        <div className="hidden md:grid grid-cols-5 items-center text-sm sm:text-base gap-4 text-center">
                            <span className="text-emerald-400/80 text-left">#{item.market_cap_rank}</span>

                            <div className="flex items-center gap-3 text-left">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-0.5"
                                />
                                <div>
                                    <p className="font-medium text-gray-100">{item.name}</p>
                                    <p className="text-cyan-400/80 text-xs">{item.symbol.toUpperCase()}</p>
                                </div>
                            </div>

                            <p className="text-gray-100">
                                {currentCurrency.symbol}
                                {item.current_price.toLocaleString()}
                            </p>

                            <div
                                className={`flex justify-center items-center gap-1 ${item.price_change_percentage_24h > 0 ? "text-emerald-400" : "text-red-400"}`}
                            >
                                <span>{item.price_change_percentage_24h > 0 ? "▲" : "▼"}</span>
                                {Math.abs(item.price_change_percentage_24h).toFixed(2)}%
                            </div>

                            <div className="text-right">
                                <p className="text-gray-100">
                                    {currentCurrency.symbol}
                                    {item.market_cap.toLocaleString()}
                                </p>
                                <p className="text-sm text-emerald-400/60">
                                    Vol: {currentCurrency.symbol}
                                    {item.total_volume.toLocaleString()}
                                </p>
                            </div>
                        </div>


                        {/* Mobile & Tablet Layout */}
                        <div className="md:hidden space-y-2 text-sm">
                            <div className="flex items-center gap-3">
                                <span className="text-emerald-400/80">#{item.market_cap_rank}</span>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-0.5"
                                />
                                <div>
                                    <p className="font-medium text-gray-100">{item.name}</p>
                                    <p className="text-cyan-400/80 text-xs">{item.symbol.toUpperCase()}</p>
                                </div>
                            </div>

                            <p className="text-gray-100">
                                Price: {currentCurrency.symbol}
                                {item.current_price.toLocaleString()}
                            </p>

                            <p
                                className={`${item.price_change_percentage_24h > 0 ? "text-emerald-400" : "text-red-400"
                                    }`}
                            >
                                Change:{" "}
                                <span>
                                    {item.price_change_percentage_24h > 0 ? "▲" : "▼"}
                                    {Math.abs(item.price_change_percentage_24h).toFixed(2)}%
                                </span>
                            </p>

                            <p className="text-gray-100">
                                Market Cap: {currentCurrency.symbol}
                                {item.market_cap.toLocaleString()}
                            </p>

                            <p className="text-emerald-400/60">
                                Vol: {currentCurrency.symbol}
                                {item.total_volume.toLocaleString()}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}
