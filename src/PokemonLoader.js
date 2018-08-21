import DataLoader from 'dataloader';
import { fromGlobalId } from 'graphql-relay';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import { Types } from 'mongoose';
import PokemonModel from './PokemonModel';


export default class Pokemon {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.number = data.number;
    this.height = data.height;
    this.weight = data.weight;
    this.imageUrl = data.imageUrl;
    this.types = data.types;
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(PokemonModel, ids));

export const load = async (context={}, id) => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await PokemonModel.findOne({ _id: id });
  } catch(err) {
    return null;
  }
  return data ? new Pokemon(data) : null;
};

export const loadAll = async (args) => {
  const Pokemon = PokemonModel.find({});
  return connectionFromMongoCursor({ cursor: Pokemon, context: {}, args, loader: load });
};
