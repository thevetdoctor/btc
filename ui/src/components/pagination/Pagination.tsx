import React from 'react';
import './pagination.css';

export interface IPagination  {
    page: number,
    totalPages: number,
    handlePageClick?: undefined
}

export default function Pagination(props: any): JSX.Element {
    const {page, totalPages, handlePageClick} = props;
    return (
        <div>
            <button
                className='btn'
                onClick={handlePageClick('prev')}
                disabled={page <= 1}>
                &larr;
            </button>
            <span className='pageClick'>
                page {page} of {totalPages}
            </span>
            <button
                className='btn'
                onClick={handlePageClick('next')}
                disabled={page >= totalPages}
            >
                &rarr;
            </button>
        </div>
    )
}
