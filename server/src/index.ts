import { expressMiddleware } from '@apollo/server/express4';
import express, { Express, Request, Response } from 'express';
import { connect } from "mongoose"
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { getSession } from "next-auth/react"
import { PubSub } from 'graphql-subscriptions';


//@ts-ignore
import resolvers from './graphql/resolvers/index.ts';
//@ts-ignore
import typeDefs from './graphql/typeDefs/index.ts';
import { GraphqlContext, MyContext, Session, SubcriptionContext } from './utils/types';
import { PrismaClient } from '@prisma/client';

import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()





const App: Express = express()

const httpServer = http.createServer(App)

const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: '/graphql/subscription',
});


//Using Prisma
const prisma = new PrismaClient
const pubsub = new PubSub();


const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const serverCleanup = useServer({ schema, context: async(ctx: SubcriptionContext): Promise<GraphqlContext> =>{
  if(ctx.connectionParams &&  ctx.connectionParams.session){
     const  { session } = ctx.connectionParams;
     return { session, prisma, pubsub }
  }
  return { session: null, prisma, pubsub }
} }, wsServer);

const server = new ApolloServer<MyContext>({
  schema,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});
await server.start()

App.use(
  '/',
  cors<cors.CorsRequest>({ origin: process.env.CLIENT_URI, credentials: true, }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }): Promise<GraphqlContext>  => {
      const session = await getSession({req}) as Session
      return { session, prisma, pubsub }
    },
  }),
);



const PORT = process.env.PORT || 4000;
await new Promise<void>((resolve) => httpServer.listen(PORT, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
