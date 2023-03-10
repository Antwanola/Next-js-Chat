import { GraphqlContext, PopulatedConvos, ParticipantPopulated } from "@/utils/types";
import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    convoQuery: async (_:any, __: any, context: GraphqlContext): Promise<Array<PopulatedConvos>> => {
      const { session, prisma } = context
      if(!session?.user) {
        throw new GraphQLError("Not Authorized")
      }

      const { user: {id: userId } } = session
      try { 
        const convos = await prisma.convo.findMany({
          // where: {
          // participants: {
          //   some: {
          //     userId: {
          //       equals:userId
          //     }
          //   }
          // }
          // },
          include: populatedConvos
        })
        // return convos
        return convos.filter(conv => !!conv.participants.find(p=> p.userId === userId))
      } catch (error: any) {
        console.log("ConvoQuery Error", error.message);
        throw new GraphQLError(error?.message)
      }


    }
  },
  Mutation: {
    createConvo: async (
      _: any,
      args: { participantIds: Array<string> },
      context: GraphqlContext
    ):Promise<{convoId: string}> => {
      const { session, prisma } = context;
      const { participantIds } = args;
      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const {
        user: { id: userId },
      } = session;
      try {
        const conversation = await prisma.convo.create({
          data: {
            participants: {
              createMany: {
                data: participantIds.map((id) => ({
                  userId: id,
                  hasSeenlatestMessage: id === userId,
                })),
              },
            },
          },
          include: populatedConvos,
        });

        return { convoId: conversation.id}
      } catch (error: any) {
        console.log("createConvoError", error.message);
        throw new GraphQLError(error.message);
      }
    },
  },
  // Subscription:{}
};

export const participantPopulated =
  Prisma.validator<Prisma.convoParticipantsInclude>()({
    user: {
      select: {
        username: true,
        id: true,
      },
    },
  });

export const populatedConvos = Prisma.validator<Prisma.ConvoInclude>()({
  participants: {
    include: participantPopulated,
  },
  latestMessage: {
    include: {
      sender: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  },
});

export default resolvers;
