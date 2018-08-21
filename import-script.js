//
import 'isomorphic-fetch'
import mongoose from 'mongoose';
import PokemonModel from './src/PokemonModel';

const URL = 'https://pokeapi.co/api/v2/pokemon/';

// https://pokeapi.co/api/v2/pokemon/1/

const getPokemonModel = (pokemonRaw) => {
  return {
    number: pokemonRaw.id,
    name: pokemonRaw.name,
    weight: pokemonRaw.weight,
    imageUrl: pokemonRaw.sprites.front_default,
    height: pokemonRaw.height,
    types: pokemonRaw.types.map(({ type }) => type.name),
  }
}

const fetchPokemon = async (number) => {
  try {
    const fetchResult = await fetch(`${URL}${number}`);
    const fetchJson = await fetchResult.json();
    // console.log('teste fetchJson', fetchJson);
    return getPokemonModel(fetchJson);
  } catch (err) {
    // eslint-disable-next-line
    console.log('erro: ', err);
  }
}

const CHUNK = 80;
const max = 151;

(async () => {
  //de 1 a 802
  try {
    await mongoose.connect('mongodb://localhost/27017');
    const client = mongoose.connection;
    const { db } = client;
    await PokemonModel.deleteMany({});

    // const bulba = await PokemonModel.find({ number: 1 });
    // console.log('teste bulba: ', bulba);
    // console.log('teste db: ', db);
    // const bulba = await fetchPokemon(1);
    // const newPokemon = await new PokemonModel(bulba).save();
    // console.log('teste newPokemon: ', newPokemon);

    const numbers = [...Array(max).keys()];
    let i = 0;
    let pokemons = [];
    for (i = 0; i < max; i = i + CHUNK) {
      const limit = i + CHUNK > max ? max : i + CHUNK;
      const temp = numbers.slice(i, limit);
      console.log('teste temp: ', temp);
      const tempPokemon = await Promise.all(temp.map(n => fetchPokemon(n+1)));
      pokemons = [...pokemons, ...tempPokemon];
      // await PokemonModel.insertMany(temp);
    }
    await PokemonModel.insertMany(pokemons);

  } catch (err) {
    // eslint-disable-next-line
    console.log('erro: ', err);
  }
})();



export default async function connect(url: string) {
  await mongoose.connect('mongodb://localhost/27017');
  const client = require('mongoose').connection;
  const { db } = client;
  return db;
}