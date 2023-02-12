import { expressMiddleware } from '@apollo/server/express4';
import express, { Express, Request, Response } from 'express';
import { connect } from "mongoose"
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()

const App: Express = express()

const httpServer = http.createServer(App)


//Connect DB
await connect(process.env.MONGO_CLIENT , {
}).then(db => {
    console.log("db secured")
})
.catch(err => {
    console.log(err)
})


interface MyContext {
  token?: string
}

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;


const server = new ApolloServer<MyContext>({
  typeDefs,
  // resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
});
await server.start()

App.use(
  '/',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);





const PORT = process.env.PORT || 4000;
App.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`)
})
