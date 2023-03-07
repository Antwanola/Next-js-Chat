import { GraphqlContext } from "@/utils/types";

const resolvers = {
  Query: {},
  Mutation: {
    createConvo: async (
      _: any,
      args: { participantsIds: Array<string> },
      context: GraphqlContext
    ) => {
      console.log("Creating convo", await args);
    },
  },
  // Subscription:{}
};

export default resolvers;
