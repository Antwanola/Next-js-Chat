import { gql } from 'graphql-tag';

const typeDefs = gql`
 type SearchedUser {
    id: String 
    username: String
 }

 type Query {
   searchUsers(username: String): [SearchedUser]
 }

 type Mutation {
  createUserName(username: String): CreateUsernameRes

    }

    type CreateUsernameRes {
        success: Boolean
        error: String
    }
 
`

export default typeDefs;