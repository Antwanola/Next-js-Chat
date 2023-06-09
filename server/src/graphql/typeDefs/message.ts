import gql from "graphql-tag";

const typedefs = gql`
  scalar Date

  type Message {
    id: String
    sender: User
    body: String
    createdAt: Date
  }

  type Query {
    messages(convoId: String): [Message]
  }

  type Mutation {
    sendMessages(
      id: String
      convoId: String
      senderId: String
      body: String
    ): Boolean
  }

  type Subscription {
    messageSent(convoId: String): Message
  }
`;

export default typedefs;
