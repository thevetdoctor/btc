/* eslint-disable no-unused-vars */
import React from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import './detail.css';
 
export default function Detail(props: any): JSX.Element {

    console.log('props', props);
    return (
        <div className='detail-banner'>
            <div className='detail-top'>
                <div className='detail-home'>
                    <span 
                        className='close-btn' 
                        onClick={props.handleDisplay}>
                            <IoCloseCircle size='2em' />
                    </span>
                    <h1 className='title-home'>
                        
                    </h1>
                    <div className='details'>
                        <span>
                           SIZE (kB): {props.size}                        
                        </span>
                        <span>
                            BLOCK INDEX: {props.block_index}
                        </span>
                        <span>
                            PREVIOUS HASH: {props.prev_block}
                        </span>
                        <span>
                            TRANSACTIONS: {props.tx?.length} transaction(s) found
                        </span>
                    </div>
                </div>
            </div> 
        </div>
    )
}
