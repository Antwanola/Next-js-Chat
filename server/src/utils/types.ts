import { PrismaClient } from "@prisma/client"
import { ISODateString } from "next-auth"

export interface GraphqlContext {
session: Session | null
prisma: PrismaClient
// pubsub
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