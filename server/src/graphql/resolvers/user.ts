 const resolver = {
    Query:{
      searchUsers: () => {}
    },
    Mutation: {
      createUserName: (_:any, args: { username: string }, context: any) => {
        const { username } = args
        const { ids } = context
        console.log("We are here from server", {args});
      }
    },
    // Subscription: {
    //   subs: () => {}
    // }
 }


 export default resolver