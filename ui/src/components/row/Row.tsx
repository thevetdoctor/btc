import React from 'react';
import {IBlock} from '../types';
import './row.css';

export default function Row({hash, time, height, rowClass, even, onClick}: IBlock) {
    return (
        <div 
            className={`row ${rowClass} ${!even ? 'even': ''}`}
            onClick={onClick}
        >
            <span className='main-span'>
                {hash}
            </span>
            <span className={`mini-span ${!rowClass && 'high'}`}>
                {time}
            </span>
            <span className={`mini-span ${!rowClass && 'low'}`}>
                {height}
            </span>
        </div>
    )
}
