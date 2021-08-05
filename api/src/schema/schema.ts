import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
} from "graphql";
import {data} from './data'

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
        height: {
          type: GraphQLInt,
        },
        time: {
          type: GraphQLInt,
        },
        hash: {
          type: GraphQLString,
        },
      },
      resolve(root, args) {
        const blocksData = data.filter(block => block.block_index === args.block_index);
        if(!args.length) return data;
        return blocksData;
      },  
    },
  }),
});

const Schema = new GraphQLSchema({
  query: Query,
});

export default Schema;
