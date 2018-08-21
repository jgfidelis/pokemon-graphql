import "babel-polyfill"
import Koa from 'koa'
import graphqlHttp from 'koa-graphql'
//import { print } from 'graphql/language';
import mongoose from 'mongoose';

import { schema } from './schema'

const PORT = process.env.PORT || 5000

var app = new Koa()

mongoose.connect('mongodb://localhost/27017');

app.use(graphqlHttp({
  schema,
  graphiql: true,
  /*extensions: ({ document, variables, operationName, result }) => {
      console.log(print(document));
      console.log(variables);
      console.log(result);
  },*/
}))

app.listen(PORT, () => {
  console.log('Server listening at port ' + PORT)
})
