import { CreateUserNameResponse, GraphqlContext } from "@/utils/types";
import { User } from "@prisma/client";
import { GraphQLError } from "graphql";



 const resolver = {
    Query:{
      searchUsers: async(_:any, args: { username: string }, context: GraphqlContext): Promise<Array<User>> => {
        const  { username: searchedUsername } = args
        const { session, prisma } = context
        if(!session.user){
          throw new GraphQLError("Not Authorized")
          // return {error: "No user found"}
        }
        const { user: { username: myUsername } } = session
        try {
          const users = await prisma.user.findMany({
            where: {
              username: {
                contains: searchedUsername,
                not: myUsername,
                mode: 'insensitive'
              }
            }
          })
          return users
        } catch (error: any) {
          console.log("searched users error:", error.message);
          throw new GraphQLError(error?.message)
        }
      }
    },
    Mutation: {
      createUserName: async (_:any, args: { username: string }, context: GraphqlContext): Promise<CreateUserNameResponse> =>{
        const { username } = args
        const { session, prisma } = context;
        if(!session.user){
          return { error: "Not Authourized"}
        }
        const { id:userId } = session.user;
        
        try {
          //Check if username isn't taken
          const existingUser = await prisma.user.findUnique({
            where: {
              username
            }
          });
          if(existingUser) {
            console.log(existingUser);
            return {
              error: "Username alredy taken. Please try another username"
            }
          }
          await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              username,
            }
          })
          return { success: true}
        } catch (err: any) {
          console.log("createUserNameError",err.message);
          return {error: err?.message}
        }
      }
    },
    // Subscription: {
    //   subs: () => {}
    // }
 }


 export default resolver