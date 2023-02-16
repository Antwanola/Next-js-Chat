import { Session } from "next-auth"
import { type } from "os"

export interface GraphqlContext {
session: Session | null
// prisma
// pubsub
}