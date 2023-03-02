import {  gql  } from "@apollo/client"

 const UserOperations = {
    Queries: {
        searchUsers: gql`
        query SerachUsers($username: String!) {
            searchUsers(username: $username) {
                id
                username
            }
        }
        `
    }, 
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