import {  gql  } from "@apollo/client"

export default {
    Queries: {}, 
    Mutations: {
        createUserName: gql`
        mutation CreateUserName($username: String!){
            createUserName(username: $username) {
                success,
                error
            }
        }
        `
    },
    Sunscriptions: {}
}