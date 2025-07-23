export default function Footer() {
  return (
    <footer className="mt-10 py-6 px-4 text-center text-sm bg-gray-900/60 backdrop-blur-md text-gray-300 border-t border-emerald-500/10">
      <p className="mb-1">
        <span className="text-emerald-400">&copy; 2025 CryptoMetrics</span> — All market data sourced from{" "}
        <a
          href="https://www.coingecko.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:underline"
        >
          CoinGecko API
        </a>
      </p>

      <p>
        Made with <span className="text-white-500">&hearts;</span> 
      </p>
    </footer>
  );
}
