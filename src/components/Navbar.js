import React from 'react'
import logo from "../static/tvm-header-logo.png";
import "../App.css";
export default function Navbar(props)
{
    return(
        <>
            <div className="navigation">
                <div>
                    <img src={logo} alt="placeholder"/>
                </div>
            </div>
        </>
    )
}