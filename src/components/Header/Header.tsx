import { useContext } from 'react'
import './Header.css'
import {NavLink} from "react-router-dom"
import { CoinContext } from '../../context/CoinContext'
import React from 'react'


let Header: React.FC = ()=>{

    const {setCurrency} = useContext(CoinContext)

    const currenccyHandler = (event) =>{
        switch(event.target.value){
            case "usd": {
                setCurrency({name: "usd", symbol: "$"});
                break;
            }
            
            case "chf": {
                setCurrency({name: "chf", symbol: "₣"});
                break;
            }
            
            case "eur": {
                setCurrency({name: "eur", symbol: "€"});
                break;
            }
            default: {
                    setCurrency({name: "usd", symbol: "$"});
                    break;
                }
            }
            
        }
    

    return(
        <div className='header'>
            <div className='header-left'>
                <img src='/logo.webp'></img>
                <h1>Crypto-Tracker</h1>
            </div>
            <div className='header-middle'>
                <ul>
                    <li><NavLink to="/" className={(navData)=>(navData.isActive ? "active" : "")}>Home</NavLink></li>
                    <li><NavLink to="/prices" className={(navData)=>(navData.isActive ? "active" : "")}>Pricing</NavLink></li>
                    <li><NavLink to="/aboutus" className={(navData)=>(navData.isActive ? "active" : "")}>About Us</NavLink></li>
                    <li><NavLink to="/blog" className={(navData)=>(navData.isActive ? "active" : "")}>Blog</NavLink></li>
                </ul>
            </div>
            <div className='header-right'>
                <select onChange={currenccyHandler}>
                    <option value="usd">USD</option>
                    <option value="chf">CHF</option>
                    <option value="eur">EUR</option>
                </select>
            </div>
        </div>
    )
}
export default Header