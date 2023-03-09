import { GraphqlContext } from "@/utils/types";
import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {},
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
          include: porpulatedConvos,
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

export const participantPorpulated =
  Prisma.validator<Prisma.convoParticipantsInclude>()({
    user: {
      select: {
        username: true,
        id: true,
      },
    },
  });

export const porpulatedConvos = Prisma.validator<Prisma.ConvoInclude>()({
  participants: {
    include: participantPorpulated,
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
