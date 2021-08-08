import React from 'react';
import { IoCaretBack, IoCaretForwardSharp } from 'react-icons/io5'
import {IPagination} from '../types';
import './pagination.css';

export default function Pagination({page, totalPages, handlePrevPage, handleNextPage}: IPagination) {
    // const {page, totalPages, handlePrevPage, handleNextPage} = props;
    return ( 
        <div className='pagination'>
            <button
                className='btn prev'
                onClick={handlePrevPage}
                disabled={page <= 1}>
                <IoCaretBack />
            </button>
            <span className='pageClick'>
                page {page} of {totalPages}
            </span>
            <button
                className='btn next'
                onClick={handleNextPage}
                disabled={page >= totalPages}
            >
                <IoCaretForwardSharp />
            </button>
        </div>
    )
}
