import React from 'react'
import { FaBtc } from 'react-icons/fa';
import './header.css';

export default function Header() {
    return (
        <div className='header'>
            <span className='btc'>
                <FaBtc />
            </span>
            <h3>
                Nuri
            </h3>
            <span className='header-small'>
                Get the best of both worlds!!!
            </span>
        </div>
    )
}
