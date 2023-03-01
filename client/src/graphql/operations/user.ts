import {  gql  } from "@apollo/client"

 const UserOperations = {
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
export default UserOperations