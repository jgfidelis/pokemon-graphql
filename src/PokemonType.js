import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { connectionDefinitions } from './CustomConnectionType';

const PokemonType = new GraphQLObjectType(
  ({
    name: 'Pokemon',
    fields: () => ({
      id: globalIdField('Pokemon'),
      name: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: obj => obj.name,
      },
      number: {
        type: new GraphQLNonNull(GraphQLInt),
        resolve: obj => obj.number,
      },
      imageUrl: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: obj => obj.imageUrl,
      },
      weight: {
        type: new GraphQLNonNull(GraphQLInt),
        resolve: obj => obj.weight,
      },
      height: {
        type: new GraphQLNonNull(GraphQLInt),
        resolve: obj => obj.height,
      },
      types: {
        type: new GraphQLList(GraphQLString),
        resolve: obj => obj.types,
      },
    }),
  }),
);

export const PokemonConnection =  connectionDefinitions({
  name: 'Pokemon',
  nodeType: PokemonType,
});

export default PokemonType;
