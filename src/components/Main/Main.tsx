import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import "./Main.css"
import { CoinContext } from "../../context/CoinContext"
import { Link } from "react-router-dom"
import React from 'react'


interface Coin{
    name: string;
    image: string;
    symbol: string;
    market_cap_rank: number;
    price_change_percentage_24h: number;
    market_cap: number;
    current_price: number;
    id: string;
}


interface CoinContextType {
    allCoin: Coin[];
    currency: {
        symbol: string;
        name: string;
    }
}

let Main: React.FC = ()=>{

    const {allCoin, currency} = useContext(CoinContext) as CoinContextType;
    const [displayCoin, setDisplayCoin] = useState<Coin[]>([])
    const [input, setInput] = useState<string>('')

    const inputHandler = (event: ChangeEvent<HTMLInputElement>)=>{
        setInput(event.target.value);
        if(event.target.value = ''){
            setDisplayCoin(allCoin)
        }
    }

    const searchHandler = async(event: FormEvent<HTMLFormElement>)=>{
        debugger
        event.preventDefault();
        const coins = await allCoin.filter((item)=>{
            return item.name.toLowerCase().includes(input.toLowerCase())
        })
        setDisplayCoin(coins)
    }

    useEffect(()=>{
        setDisplayCoin(allCoin)
    },[allCoin])

    return(
        <div className="main">
            <div className="main-up">
                <h1>Crypto Tracker</h1>
                <p>Welcome to a small web application that allows users to track prices and dynamics of various cryptocurrencies in real time.</p>
                <form onSubmit={searchHandler}>
                    <input onChange={inputHandler} value={input} list="coinlist" type="text" placeholder="Search crypto..." />

                    <datalist id="coinlist">
                        {allCoin.map((item, index)=>(<option key={index} value={item.name}/>))}
                    </datalist>

                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="crypto-table">
                <div className="table-layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{textAlign: 'center'}}>24H Change</p>
                    <p style={{textAlign: 'right'}}>Market Cap</p>
                </div>
                {
                    displayCoin.slice(0, 10).map((item, index)=>(
                        <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                            <p>{item.market_cap_rank}</p>
                            <div className="table-mid">
                                <img src={item.image}></img>
                                <p>{item.name + " - " + item.symbol }</p>
                            </div>    
                            <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
                            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
                            <p>{currency.symbol}{item.market_cap.toLocaleString()}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
export default Main