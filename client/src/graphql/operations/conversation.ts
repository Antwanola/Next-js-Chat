import { gql } from "@apollo/client";

const convoField = `

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
      updatedAt
`;
const convoCreation = {
  Queries: {
    convoQuery: gql`
      query ConvoQuery {
        convoQuery{
            ${convoField}
          }
           
        }`,
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
  Subscriptions: {
    createdConvo: gql`
     subscription ConvoCreated {
      createdConvo {
        ${convoField}
      }
    }
    `
  }
};

export default convoCreation;
