import gql from "graphql-tag";

const typedefs = gql`
scalar Date

type Message {
    id: String
    sender: User
    body: String
    createdAt: Date
}
`

export default typedefs