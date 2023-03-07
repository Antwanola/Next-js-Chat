import { gql } from "graphql-tag";

const typeDefs = gql`
type Mutation {
    createConvo(participantsId: [String]): createConvoRes
}

type createConvoRes {
    convoId: String
}
`;


export default typeDefs
