import { expressMiddleware } from '@apollo/server/express4';
import express, { Express, Request, Response } from 'express';
import { connect } from "mongoose"
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';

//@ts-ignore
import {resolvers} from './graphql/resolvers/index.ts';
//@ts-ignore
import {typeDefs} from './graphql/typeDefs/index.ts';

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

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const server = new ApolloServer<MyContext>({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
});
await server.start()

App.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);





const PORT = process.env.PORT || 4001;
App.listen(PORT, ()=>{
  console.log(`Listening on port http://localhost:${PORT}/graphql`)
})
