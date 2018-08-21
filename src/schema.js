import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { mongooseLoader } from '@entria/graphql-mongoose-loader';

import PokemonType, { PokemonConnection } from './PokemonType';
import PokemonModel from './PokemonModel';
import { connectionArgs } from './CustomConnectionType';
import * as PokemonLoader from  './PokemonLoader';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    allPokemon: {
      type: new GraphQLList(PokemonType),
      resolve: async () => {
        return await PokemonModel.find({});
      },
    },
    paginated: {
      // type: SessionTokenConnection.connectionType
      type: PokemonConnection.connectionType,
      args: connectionArgs,
      resolve: async (obj, args) => {
        console.log('teste args: ', obj, args);
        return await PokemonLoader.loadAll(args);
        // return await PokemonModel.find({}); //still returns all
      }
    }
  })
})

export const schema = new GraphQLSchema({
  query: QueryType
});
