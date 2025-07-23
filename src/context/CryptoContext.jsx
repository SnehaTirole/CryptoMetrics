import { createContext, useEffect, useState } from "react";

export const CryptoContext = createContext();

export default function CryptoContextProvider  (props)  {

    const [cryptoList, setCryptoList] = useState([]);
    const [filteredCryptos, setFilteredCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentCurrency, setCurrentCurrency] = useState({
        name: "USD",
        symbol: "$",
    })

    //API->	CG-ecJ3DrhR4E8D94qEgLFvzVDg

    const fetchCryptoData = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': '	CG-ecJ3DrhR4E8D94qEgLFvzVDg'
            }
        };

        try {
            const resp=await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency.name}`,options);

            const data = await resp.json();
            setCryptoList(data);
        }
        catch (err) {
            console.error("Failed to fetch crypto data:", err);
        }
    }

    //Re-Fetching when CURRENCY changes

    useEffect(() => {
        fetchCryptoData();
    }, [currentCurrency]);

    //Re-filtered when raw list or search term changes

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredCryptos(cryptoList);
        }
        else {
            setFilteredCryptos(
                cryptoList.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        }
    }, [cryptoList, searchTerm]);

    const contextValue = {
        cryptoList,
        filteredCryptos,
        currentCurrency,
        setCurrentCurrency,
        searchTerm,
        setSearchTerm
    }
    return (
        <CryptoContext.Provider value={contextValue}>
            {props.children}
        </CryptoContext.Provider>
    )
}

// export default CryptoContextProvider;