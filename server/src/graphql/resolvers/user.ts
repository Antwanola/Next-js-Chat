import { CreateUserNameResponse, GraphqlContext } from "@/utils/types";



 const resolver = {
    Query:{
      searchUsers: () => {}
    },
    Mutation: {
      createUserName: async (_:any, args: { username: string }, context: GraphqlContext): Promise<CreateUserNameResponse> =>{
        const { session, prisma } = context;
        if(!session.user){
          return { error: "Not Authourized"}
        }
        const { id } = session.user;
        console.log({id});
        try {
          //Check if username isn't taken
          const existingUser = await prisma.user.findUnique({
            where: {
              id
            }
          });
          console.log(existingUser);
          // if(existingUser) {
          //   console.log({user: true});
          //   return {
          //     error: "Username alredy taken. Please try another username"
          //   }
          // }
          // await prisma.user.updateMany({
          //   where: {
          //     id: userId,
          //   },
          //   data: {
          //     username: username,
          //   }
          // })
          // return { success: true}
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