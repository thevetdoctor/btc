/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import Row from '../row/Row';
import Block from '../block/Block';
import Pagination, { IPagination } from '../pagination/Pagination';
import {data} from '../../data';
import './board.css';

export interface IBlock {
    block_index: number | string,
    height: number | string,
    time: number | string,
    hash: string,
    rowClass?: string,
    even: boolean
}

export default function Board(props: any): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<IBlock[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageData, setPageData] = useState<IBlock[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [displayBlock, setDisplayBlock] = useState<boolean>(false);

const handlePageClick = (direction: string) => {
  let nextPage = page;
  console.log(page, direction);
  nextPage = direction === 'next'? nextPage + 1: nextPage - 1;
  setPage(nextPage );
}

    const apiUrl = '/';

    useEffect(() => {
        const fetchData = async() => {
          const query = `query={
                          blocks{
                            hash,
                            block_index,
                            height,
                            time
                          }
                        }`;
          const url = `${apiUrl}graphql?${query}`;
              const res = await axios({
                method: 'POST',
                url,
                headers: {'Content-Type': 'application/graphql'}
              });   
              console.log(res.data);
              if(res.data) {
                  setFetchedData(res.data.data.blocks);
                  // setFetchedData(data);
                }
            }
          fetchData();        
        return () => console.log('cleanup Board.js')
    }, []);

    useEffect(() => {
      setPageData(fetchedData.splice(0, 10));
      console.log(pageData)
      let dataLength = Math.trunc(data.length / 10);
      setTotalPages(dataLength + ((dataLength % 10) > 0 ? 1 : 0));      
      console.log(pageData)
    }, [page]);

   return (
     <div className='board'>
          {displayBlock ?
             <Fragment>
            <Pagination
              page={page}
              totalPages={totalPages}
              handlePageClick={() => handlePageClick}
            />

             {!loading ? 
            <Fragment>
              {pageData.length ?
                <Fragment>
                    <Row 
                      hash='Hash'
                      time='Age'
                      block_index='Index'
                      height='Height'
                      rowClass='row-heading'
                      even={false}
                    />
                    {pageData.map((block:IBlock, idx:number) => (
                      <Row
                          key={idx}
                          hash={block.hash}
                          block_index={block.block_index}
                          height={block.height}
                          time={block.time}
                          even={idx % 2 === 0 ? true: false}
                      />
                  ))}
                </Fragment>
                :
                <Fragment>
                  <div className='no-data'>
                    No data available
                  </div>
                </Fragment>
              }
            </Fragment>
                :
            <Fragment>
            <Loader 
                type='ThreeDots'
                color='#00bfff'
                height={40} 
                width={40} 
            />
            </Fragment>}
            </Fragment>
        :
        <Fragment>
          {/* <Block /> */}
        </Fragment>}
        </div>
    )
}
