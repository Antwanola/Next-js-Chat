import { gql } from 'graphql-tag';

const typeDefs = gql`
 type User {
    id: String 
    username: String
 }

 type Query {
   searchUsers(username: String): [User]
 }

 type Mutation {
    createUsername(username: String): CreateUsernameRes

    }

    type CreateUsernameRes {
        success: String
        Error: String
    }
 
`

export default typeDefs;