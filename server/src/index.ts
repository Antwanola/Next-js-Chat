import express, { Express, Request, Response } from 'express';
import { connect } from "mongoose"
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import dotenv from 'dotenv';
dotenv.config()

const App: Express = express()
//Connect DB
connect(process.env.MONGO_CLIENT , {
}).then(db => {
    console.log("db secured")
})
.catch(err => {
    console.log(err)
})

// Define Middlewears
App.use(express.urlencoded({
    extended: true
}))
App.use(express.json())

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
const PORT = process.env.PORT || 4000;

