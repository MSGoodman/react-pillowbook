import React from 'react';
import './Header.css';
import logo from '../../assets/logo.png'

function Header() {
    return (
        <div className="Header">
            <img src={logo} alt="PillowBook logo" />
            <h1>PillowBook</h1>
        </div>
    );
}

export default Header;
