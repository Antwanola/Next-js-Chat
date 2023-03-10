import { gql } from "@apollo/client";

const convoField = `
convoQuery{
    id
    participants {
        user {
            id
        username
        }
    hasSeenlatestMessage   
    }
    latestMessage {
        id
        sender {
            id
            username
        }
        body
        createdAt
    }
}

`;
const convoCreation = {
  Queries: {
    convoQuery: gql`
        query ConvoQuery {
            ${convoField}
        }
        `,
  },
  Mutations: {
    createConvo: gql`
      mutation CreateConvo($participantIds: [String]!) {
        createConvo(participantIds: $participantIds) {
          convoId
        }
      }
    `,
  },
};

export default convoCreation;
