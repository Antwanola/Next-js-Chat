import { gql } from "@apollo/client";

const convoCreation =  {
    // Queries: {},
    Mutations:{
        createConvo: gql`
        mutation CreateConvo($participantIds: [String]!) {
            createConvo(participantIds: $participantIds){
            convoId
        }
        }
        `,
    }
}

export default convoCreation