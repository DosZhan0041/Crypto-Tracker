import { useParams } from 'react-router-dom'
import './Coin.css'
import { useContext, useEffect, useState } from 'react';
import { CoinContext } from '../../context/CoinContext';
import LineChart from './LineChart/LineChart';
import React from 'react';

interface CoinImage{
    large: string;
}

 interface Market_Data {
    high_24h: any;
    low_24h: any;
    current_price: any;
}

interface CoinData{
    name: string;
    symbol: string;
    image: CoinImage;
    market_cap_rank: number;
    market_data: Market_Data;
}



interface HistoricData {
    prices: Array<[number, number]>;
}



const Coin: React.FC = () =>{
    const {coinId} = useParams<{coinId: string}>();
    const [coinData, setCoinData] = useState<CoinData | null>();
    const [historicData, setHistoricData] = useState<HistoricData>();
    const {currency} = useContext(CoinContext);

    let fetchCoinData = async() => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-n1xNKzgqyxnKr4p2e8e6VHAn'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
            .then(response => response.json())
            .then(response => setCoinData(response))
            .catch(err => console.error(err));
    }

    let fetchHistoricData = async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-n1xNKzgqyxnKr4p2e8e6VHAn'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
            .then(response => response.json())
            .then(response => setHistoricData(response))
            .catch(err => console.error(err));
    }

    

    useEffect(()=>{
        fetchCoinData()
        fetchHistoricData()
    },[currency])

        return(
            <div className='coin'>
                {coinData&&historicData ? (
                    <div className='coin-wrapper'>
                        <div className='coin-logo'>
                            <h1>{coinData.name} - ({coinData.symbol})</h1>
                            <img src={coinData.image.large}></img>
                        </div>
                        <div className='coin-chart'>
                            <LineChart prices={historicData.prices}/>
                        </div>
                        <div className='coin-data'>
                            <p>Capital Rank: {coinData.market_cap_rank}</p>
                            <p>High in 24 hours:  {currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</p>
                            <p>Low in 24 hours: {currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</p>
                            <p>Current Price: {currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</p>
                        </div>
                    </div>
                ):(
                    <div className='coin_loader'>
                        <span className="loader"></span>
                    </div>
                )}
                
            </div>
        )
    
   
    
}
export default Coin