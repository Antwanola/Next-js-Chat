import { gql } from "@apollo/client";

const convoCreation =  {
    // Queries: {},
    Mutations:{
        createConvo: gql`
        mutation CreateConvo($participantsIds: [String]!) {
            createConvo(participantsIds: $participantsIds){
            convoId
        }
        }
        
        `,
    }
}

export default convoCreation