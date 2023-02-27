import { CreateUserNameResponse, GraphqlContext } from "@/utils/types";



 const resolver = {
    Query:{
      searchUsers: () => {}
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
        } catch (err) {
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