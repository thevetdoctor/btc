/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import Row from '../row/Row';
import Detail from '../block/Detail';
import { IBlock, IDetail } from '../types';
import Pagination from '../pagination/Pagination';
import './board.css';

export default function Board(props: any): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<IBlock[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageData, setPageData] = useState<IBlock[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [blockDetailsData, setBlockDetailsData] = useState<any>(null);
  const [displayBlock, setDisplayBlock] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const apiUrl = '';

    const handlePrevPage = () => {
      let nextPage = page;
      console.log(page, 'prev');
      nextPage = nextPage - 1;
      setPage(nextPage);
    }

    const handleNextPage = () => {
      let nextPage = page;
      console.log(page, 'next');
      nextPage = nextPage + 1;
      setPage(nextPage);
    }

    const handleClick = (hash: string) => {
      console.log('clicked');
      getBlockDetails(hash);
      setDisplayBlock(true);
    };

    const handleDisplay = () => {
      setDisplayBlock(false);
      setBlockDetailsData(null);
    };

    const getBlockDetails = async(hash: string) => {
      if(!hash) {
          return;
        }

        const query = `query={
          details(hash: "${hash}"){
            size
            block_index
            prev_block    
            tx{
              tx_index
              inputs{
                index
              }
              out{
                spending_outpoints{
                  tx_index
                  n
                }
              }
              lock_time
              relayed_by
            }
          }
        }`;
        const url = `${apiUrl}graphql?${query}`;
        const res = await axios({
        method: 'POST',
        url,
        headers: {'Content-Type': 'application/graphql'}
        });   
        if(res.data.data.details) {
          setBlockDetailsData(res.data.data.details);
        }
    };

    const fetchData = async() => {
      setLoading(true);
      const query = `query={
                      blocks{
                        hash,
                        block_index,
                        height,
                        time
                      }
                    }`;
      const url = `${apiUrl}graphql?${query}`;
      try{
          const res = await axios({
            method: 'POST',
            url,
            headers: {'Content-Type': 'application/graphql'}
          });
          const { blocks } = res.data.data;
          if(blocks) {
              const cloned = [...blocks];
              const lowerLimit = ((page - 1) * pageSize);
              const higherLimit = lowerLimit + pageSize - 1;
              const clonedData = cloned.slice(lowerLimit, pageSize);
              setPageData(clonedData);
              setFetchedData(blocks);
              let pages = Math.round(blocks.length / pageSize);
              setTotalPages(pages);      
              console.log(page, pageSize, lowerLimit, higherLimit, pageData);

              setLoading(false);
            } else {
              setLoading(false);
              console.log('no blocks');
            }
          } catch(e) {
            setError(e.message);
            console.log(e.message);
            setLoading(false);
          }
        };

    useEffect(() => {
          fetchData();

        return () => console.log('cleanup Board.js(1)')
      }, []);
      
      useEffect(() => {
        if(fetchedData) {
          const cloned = [...fetchedData];
          const lowerLimit = ((page - 1) * pageSize);
          const higherLimit = lowerLimit + pageSize - 1;
          const clonedData = cloned.splice(lowerLimit, pageSize);
          setPageData(clonedData);
          console.log(page, pageSize, lowerLimit, higherLimit, pageData);
        }
        return () => console.log('cleanup Board.js(2)')
    }, [page]);

   return (
     <div className='board'>
          {!displayBlock ?
             <Fragment>

                  {!loading ? 
                      <Fragment>
                        <Pagination
                          page={page}
                          totalPages={totalPages}
                          handlePrevPage={() => handlePrevPage()}
                          handleNextPage={() => handleNextPage()}
                        /> 
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
                                      onClick={() => handleClick(block.hash)}
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
                      </Fragment>
                  }
            </Fragment>
          :
          <Fragment>
            {blockDetailsData ?
            <Detail
              size={blockDetailsData?.size}
              block_index={blockDetailsData?.block_index}
              prev_block={blockDetailsData?.prev_block}
              tx={blockDetailsData?.tx}
              handleDisplay={handleDisplay}
            />
            :
            <>
               <Loader 
                type='ThreeDots'
                color='#00bfff'
                height={40} 
                width={40} 
              />
              {/* Block details loading ... */}
            </>}
          </Fragment>
        }
      </div>
    )
}
