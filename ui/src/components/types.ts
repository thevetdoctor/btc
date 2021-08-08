export interface IBlock {
    block_index: number | string,
    height: number | string,
    time: number | string,
    hash: string,
    rowClass?: string,
    even: boolean,
    onClick?: any
}

export interface ITransaction {
  tx_index: number,
  inputs: {
    index: number,
  }[],
  out: {
    spending_outpoints: {
      tx_index: number,
      n: number
    }
  }[],
  lock_time: number,
  relayed_by: string
}

export interface IDetail {
  size: number,
  block_index: number,
  prev_block: string,    
  tx: ITransaction[]
}

export interface IPagination  {
    page: number,
    totalPages: number,
    handlePrevPage?: () => void,
    handleNextPage?: () => void
}
