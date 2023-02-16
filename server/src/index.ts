import { expressMiddleware } from '@apollo/server/express4';
import express, { Express, Request, Response } from 'express';
import { connect } from "mongoose"
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { getSession } from "next-auth/react"

import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()



//@ts-ignore
import resolvers from './graphql/resolvers/index.ts';
//@ts-ignore
import typeDefs from './graphql/typeDefs/index.ts';
import { GraphqlContext } from '../types';


const App: Express = express()

const httpServer = http.createServer(App)

//Connect DB
await connect(process.env.MONGO_URI , {
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
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
});
await server.start()

App.use(
  '/',
  cors<cors.CorsRequest>({ origin: "http://localhost:3000", credentials: true, }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }): Promise<GraphqlContext>  => {
      const session = await getSession({req})
      console.log(session);
      return 
    },
  }),
);



const PORT = process.env.PORT || 4000;
await new Promise<void>((resolve) => httpServer.listen(PORT, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
