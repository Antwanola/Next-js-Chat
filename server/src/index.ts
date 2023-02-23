import { expressMiddleware } from '@apollo/server/express4';
import express, { Express, Request, Response } from 'express';
import { connect } from "mongoose"
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { getSession } from "next-auth/react"


//@ts-ignore
import resolvers from './graphql/resolvers/index.ts';
//@ts-ignore
import typeDefs from './graphql/typeDefs/index.ts';
import { GraphqlContext, MyContext, Session } from './utils/types';
import { PrismaClient } from '@prisma/client';

import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()





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


//Using Prisma
const prisma = new PrismaClient



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
  cors<cors.CorsRequest>({ origin: process.env.CLIENT_URI, credentials: true, }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }): Promise<GraphqlContext>  => {
      const session = await getSession({req}) as Session
      return { session, prisma }
    },
  }),
);



const PORT = process.env.PORT || 4000;
await new Promise<void>((resolve) => httpServer.listen(PORT, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
