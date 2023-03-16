import { gql } from 'graphql-tag';

const typeDefs = gql`

type User {
  id: String
  name: String
  username: String
  email: String
  emailVerified: Boolean
  image: String
}


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