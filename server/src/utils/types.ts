import { participantPopulated, populatedConvos } from "@/graphql/resolvers/conversations"
import { Prisma, PrismaClient } from "@prisma/client"
import { ISODateString } from "next-auth"
import { Context } from "graphql-ws/lib/server"
import { PubSub } from "graphql-subscriptions"

export interface GraphqlContext {
session: Session | null
prisma: PrismaClient
pubsub: PubSub
}


//Server types or interfaces
export interface SubcriptionContext extends Context {
  connectionParams: {
    session? : Session
  }
}

export interface MyContext {
    token?: string
  }

  //for users

  export interface Session {
    user: User
    expires: ISODateString
  }

  export interface CreateUserNameResponse {
    success?: boolean;
    error?: string
  }

  export interface User {
    id: string
    image: string
    username: string
    emailVerified: boolean
    email: string
    name: string
  }


  //Conversation (Convo) type section

  export type  PopulatedConvos  = Prisma.ConvoGetPayload<{ include: typeof populatedConvos }>

  export type ParticipantPopulated = Prisma.convoParticipantsGetPayload<{ include:  typeof participantPopulated }>