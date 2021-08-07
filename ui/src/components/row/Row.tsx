import React from 'react';
import './row.css';
import {IBlock} from '../board/Board';

export default function Row({hash, time, block_index, height, rowClass, even}: IBlock) {
    return (
        <div className={`row ${rowClass} ${!even ? 'even': ''}`}>
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
