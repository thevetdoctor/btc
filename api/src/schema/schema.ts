import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLScalarType,
  GraphQLNonNull,
  GraphQLFloat,
} from "graphql";
import axios from 'axios';
import {data} from './data';
import { details } from "./details";

export interface IBlock {
  block_index: number | string,
  height: number | string,
  time: number | string,
  hash: string,
}

const Block = new GraphQLObjectType({
  name: "Block",
  description: "This is a typical block",
  fields: () => ({
    block_index: {
      type: GraphQLString,
      resolve(block) {
        return block.block_index;
      },
    },
    height: {
      type: GraphQLInt,
      resolve(block) {
        return block.height;
      },
    },
    time: {
      type: GraphQLInt,
      resolve(block) {
        return block.time;
      },
    },
    hash: {
      type: GraphQLString,
      resolve(block) {
        return block.hash;
      },
    },
    details: {
      type: Detail,
      resolve(block) {
        return block.details;
      },
    },
  }),
});

const Detail = new GraphQLObjectType({
  name: "Detail",
  description: "This is a typical block detail",
  fields: () => ({  
    hash: {
      type: GraphQLString,
      resolve(detail) {
        return detail.hash;
      },
    },
    ver: {
      type: GraphQLInt,
      resolve(detail) {
        return detail.ver;
      },
    },
    prev_block: {
      type: GraphQLString,
      resolve(detail) {
        return detail.prev_block;
      },
    },
    mrkl_root: {
      type: GraphQLString,
      resolve(detail) {
        return detail.mrkl_root;
      },
    },
    time: {
      type: GraphQLInt,
      resolve(detail) {
        return detail.time;
      },
    },
    bits: {
      type: GraphQLInt,
      resolve(detail) {
        return detail.bits;
      },
    },
    next_block: {
      type: new GraphQLList(GraphQLString),
      resolve(detail) {
        return detail.next_block;
      },
    },
    fee: {
      type: GraphQLInt,
      resolve(detail) {
        return detail.fee;
      },
    },
    nonce: {
      type: GraphQLInt,
      resolve(detail) {
        return detail.nonce;
      },
    },
    n_tx: {
      type: GraphQLInt,
      resolve(detail) {
        return detail.n_tx;
      },
    },
    size: {
      type: GraphQLInt,
      resolve(detail) {
        return detail.size;
      },
    },
    block_index: {
      type: GraphQLInt,
      resolve(detail) {
        return detail.block_index;
      },
    },
    main_chain: {
      type: GraphQLBoolean,
      resolve(detail) {
        return detail.main_chain;
      },
    },
    height: {
      type: GraphQLInt,
      resolve(detail) {
        return detail.height;
      },
    },
    weight: {
      type: GraphQLInt,
      resolve(detail) {
        return detail.weight;
      },
    },
    tx: {
      type: new GraphQLList(Transaction),
      resolve(detail) {
        return detail.tx;
      },
    },
  }),
});

const Transaction = new GraphQLObjectType({
  name: "Transaction",
  description: "This is a typical block transaction",
  fields: () => ({  
    hash: {
      type: GraphQLString,
      resolve(transaction) {
        return transaction.hash;
      },
    },
    ver: {
      type: GraphQLInt,
      resolve(transaction) {
        return transaction.ver;
      },
    },
    vin_sz: {
      type: GraphQLInt,
      resolve(transaction) {
        return transaction.vin_sz;
      },
    },
    vout_sz: {
      type: GraphQLInt,
      resolve(transaction) {
        return transaction.vout_sz;
      },
    },
    size: {
      type: GraphQLInt,
      resolve(transaction) {
        return transaction.size;
      },
    },
    weight: {
      type: GraphQLInt,
      resolve(transaction) {
        return transaction.weight;
      },
    },
    fee: {
      type: GraphQLInt,
      resolve(transaction) {
        return transaction.fee;
      },
    },
    relayed_by: {
      type: GraphQLString,
      resolve(transaction) {
        return transaction.relayed_by;
      },
    },
    lock_time: {
      type: GraphQLInt,
      resolve(transaction) {
        return transaction.lock_time;
      },
    },
    tx_index: {
      type: GraphQLFloat,
      resolve(transaction) {
        return transaction.tx_index;
      },
    },
    double_spend: {
      type: GraphQLBoolean,
      resolve(transaction) {
        return transaction.double_spend;
      },
    },
    time: {
      type: GraphQLInt,
      resolve(transaction) {
        return transaction.time;
      },
    },
    block_index: {
      type: GraphQLInt,
      resolve(transaction) {
        return transaction.block_index;
      },
    },
    block_height: {
      type: GraphQLInt,
      resolve(transaction) {
        return transaction.block_height;
      },
    },
    inputs: {
      type: new GraphQLList(Input),
      resolve(transaction) {
        return transaction.inputs;
      },
    },
    out: {
      type: new GraphQLList(Out),
      resolve(transaction) {
        return transaction.out
      }
    }
  }),
});

const Input = new GraphQLObjectType({
  name: 'Input',
  description: "This is a typical transaction input",
  fields: () => ({
    sequence: {
      type: GraphQLFloat,
      resolve(input) {
        return input.sequence;
      },
    },
    witness: {
      type: GraphQLString,
      resolve(input) {
        return input.witness
      },
    },
    script: {
      type: GraphQLString,
      resolve(input) {
        return input.script
      },
    },
    index: {
      type: GraphQLInt,
      resolve(input) {
        return input.index
      },
    },
    prev_out: {
      type: PrevOut,
      resolve(input) {
        return input.prev_out
      },
    },
  }),
});

const Outpoint = new GraphQLObjectType({
  name: "Outpoint",
  description: "This a typical spending outpoint",
  fields: () => ({
    tx_index: {
      type: GraphQLFloat,
      resolve(outpoint) {
        return outpoint.tx_index;
      },
    },
    n: {
      type: GraphQLInt,
      resolve(outpoint) {
        return outpoint.n;
      },
    },
  }),
});

const PrevOut = new GraphQLObjectType({
  name: "Prev_Out",
  description: "This is the typical prev_out",
  fields: ({
    spent: {
      type: GraphQLBoolean,
      resolve(out) {
        return out.spent
      },
    },
    script: {
      type: GraphQLString,
      resolve(out) {
        return out.script
      },
    },
    spending_outpoints: {
      type: new GraphQLList(Outpoint),
      resolve(out) {
        return out.spending_outpoints
      },
    },
    tx_index: {
      type: GraphQLFloat,
      resolve(out) {
        return out.tx_index;
      },
    },
    value: {
      type: GraphQLInt,
      resolve(out) {
        return out.value
      },
    },
    addr: {
      type: GraphQLString,
      resolve(out) {
        return out.addr
      },
    },
    n: {
      type: GraphQLInt,
      resolve(out) {
        return out.n;
      },
    },
    type: {
      type: GraphQLInt,
      resolve(out) {
        return out.type
      },
    },
  }),
});

const Out = new GraphQLObjectType({
  name: "Out",
  description: "This is a typical transaction out",
  fields: ({
    type: {
      type: GraphQLInt,
      resolve(out) {
        return out.type
      },
    },
    spent: {
      type: GraphQLBoolean,
      resolve(out) {
        return out.spent
      },
    },
    value: {
      type: GraphQLInt,
      resolve(out) {
        return out.value
      },
    },
    spending_outpoints: {
      type: new GraphQLList(Outpoint),
      resolve(out) {
        return out.spending_outpoints
      },
    },
    n: {
      type: GraphQLInt,
      resolve(out) {
        return out.n;
      },
    },
    tx_index: {
      type: GraphQLFloat,
      resolve(out) {
        return out.tx_index;
      },
    },
    script: {
      type: GraphQLString,
      resolve(out) {
        return out.script
      },
    },
    addr: {
      type: GraphQLString,
      resolve(out) {
        return out.addr
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  description: "This is the root query",
  fields: () => ({
    blocks: {
      type: new GraphQLList(Block),
      args: {
        block_index: {
          type: GraphQLInt,
        },
        numberOfDays: {
          type: GraphQLInt,
        },
      },
      async resolve(root, args) {
        let date = Date.now();
        if(args.numberOfDays) {
          date = date - (args.numberOfDays * 86400000);
        } else {
          date = date - 86400000;
        }

        let allData: IBlock[] = [];
        const res: any = await axios({
          method: 'GET',
          url: `https://blockchain.info/blocks/${date}?format=json`,
          headers: {'Content-Type': 'application/json'
            }
        });
        
        allData = res.data;
        if(!args.block_index) return allData;
        const blocksData = allData.filter((block: IBlock) => {
          return block.block_index === args.block_index;
        });
        return blocksData;
      },  
    },
    details: {
      type: Detail,
      args: {
        hash: {
          type: GraphQLNonNull(GraphQLString)
        }
      },
      async resolve(root, args) {
        let blockDetails;
        const res: any = await axios({
          method: 'GET',
          url: `https://blockchain.info/rawblock/${args.hash}`,
          headers: {'Content-Type': 'application/json'
            }
        });

        blockDetails = res.data;
        return blockDetails;
      }
    }
  }),
});

const Schema = new GraphQLSchema({
  query: Query,
});

export default Schema;
