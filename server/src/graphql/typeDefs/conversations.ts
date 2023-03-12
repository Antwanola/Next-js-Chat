import { gql } from "graphql-tag";

const typeDefs = gql`
scalar Date

type Mutation {
    createConvo(participantIds: [String]): createConvoRes
}

type Participant {
    id: String
    user: User
    hasSeenlatestMessage: Boolean
}

type Convo {
id: String
latestMessage: Message
participants: [Participant]
createdAt: Date
updatedAt: Date
}



type Query {
    convoQuery: [Convo]
}

type createConvoRes {
    convoId: String
}

type Subscription {
    createdConvo: Convo
 }
`;



export default typeDefs
