/* eslint-disable no-unused-vars */
import React, { useSelector } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import './block.css';
 
export default function Block({block}) {
    
    const handleDisplay = () => {
    }

    return (
        <div className='block-banner'>
            <div className='block-top'>
                <div className='block-home'>
                    <span 
                        className='close-btn' 
                        onClick={handleDisplay}>
                            <IoCloseCircle size='2em' />
                    </span>
                    <h1 className='title-home'>
                        Game Rules
                    </h1>
                    <div>
                        The goal is to be the first player to win all 52 cards
                    </div>
                </div>
            </div> 
        </div>
    )
}
