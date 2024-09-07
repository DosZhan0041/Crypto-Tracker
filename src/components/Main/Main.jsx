import { useContext, useEffect, useState } from "react"
import "./Main.css"
import { CoinContext } from "../../context/CoinContext"
import { Link } from "react-router-dom"

let Main = ()=>{

    const {allCoin, currency} = useContext(CoinContext)
    const [displayCoin, setDisplayCoin] = useState([])
    const [input, setInput] = useState('')

    const inputHandler = (event)=>{
        setInput(event.target.value);
        if(event.target.value = ''){
            setDisplayCoin(allCoin)
        }
    }

    const searchHandler = async(event)=>{
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