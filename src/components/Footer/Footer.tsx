import { NavLink } from "react-router-dom"
import "./Footer.css"
import React from 'react';


let Footer: React.FC = ()=>{
    return(
        <div className="footer_wrapper">
            <div className="footer">
                <div className="footer_left">
                    <h2>Frontend-developer: Doszhan Ilyassov</h2>
                    <p>30 June, 2024</p>
                </div>
                <div className="footer_middle">
                    <NavLink to="/">Home</NavLink>
                    <a href="https://www.instagram.com/bauyrzhanuly_16" target="_blank">Instagram</a>
                    <a href="https://t.me/bauyrzhanuly_16" target="_blank">Telegram</a>
                    <a href="#">VK</a>
                </div>
                <div className="footer_right">
                    <p>Get to know us</p>
                    <div className="footer_icons">
                            <a href="https://github.com/DosZhan0041" target="_blank"><img src="/git.webp"></img></a>
                            <a href="https://www.linkedin.com/in/doszhan-ilyassov-563817300/" target="_blank"><img src="/linked.png"></img></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer