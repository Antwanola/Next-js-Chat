import { gql } from "graphql-tag";

const typeDefs = gql`
type Mutation {
    createConvo(participantIds: [String]): createConvoRes
}

type createConvoRes {
    convoId: String
}
`;


export default typeDefs
