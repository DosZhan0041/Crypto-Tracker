import { createContext, ReactNode, useEffect, useState } from "react";
import React from "react";


interface Currency {
    name: string;
    symbol: string;
}

interface Coin{
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    market_cap: number;
    image: string;
}

interface CoinContextType {
    allCoin: Coin[];
    currency: Currency;
    setCurrency: React.Dispatch<React.SetStateAction<Currency>>
}

export const CoinContext = createContext<CoinContextType | any>(undefined);

const CoinContextProvider:React.FC<{children: ReactNode}> = ({children})=>{

    const [allCoin, setAllCoin] = useState<Coin[]>([])
    const [currency, setCurrency] = useState<Currency>({
        name: "usd",
        symbol: "$"
    })

    const fetchRequest = async()=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': '	CG-n1xNKzgqyxnKr4p2e8e6VHAn'
            }
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }

    useEffect(()=>{
        fetchRequest();
    },[currency])

    const contextValue = {
        allCoin, currency, setCurrency
    }
    return(
        <CoinContext.Provider value={contextValue}>
            {children}
        </CoinContext.Provider>
    )
}
export default CoinContextProvider