import {
  GraphqlContext,
  messageSubscriptionPayload,
  sendMessageArgs,
  PopulatedMessages,
} from "@/utils/types";
import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import { withFilter } from "graphql-subscriptions";

const resolvers = {
  Query: {
    messages: async (
      _: any,
      args: { convoId: string },
      context: GraphqlContext
    ): Promise<Array<PopulatedMessages>> => {
        const { session,prisma, pubsub } = context
        const { user: { id: userId } } = session
        const { convoId } = args

        if(!session?.user) {
            throw new GraphQLError("Not authorized")
        }
        const convo = await prisma.convo. findUnique({
            where: {
                id: convoId
            },

        })
        if(!convo){
            throw new GraphQLError("Conversation Not Found!")
        }
      return [];
    },
  },
  Mutation: {
    sendMessages: async (
      _: any,
      args: sendMessageArgs,
      context: GraphqlContext
    ): Promise<boolean> => {
      const { session, prisma, pubsub } = context;
      const { id: userId } = session.user;
      const { id: messageId, senderId, convoId, body } = args;

      if (!session?.user) {
        throw new GraphQLError("Not Authorized");
      }
      if (senderId !== userId) {
        throw new GraphQLError("Not Authorized");
      }
      try {
        const newMessage = await prisma.message.create({
          data: {
            id: messageId,
            senderId,
            ConvoId: convoId,
            body,
          },
          include: populatedMessages,
        });

        const convo = await prisma.convo.update({
          where: {
            id: convoId,
          },
          data: {
            latestMessageId: newMessage.id,
            participants: {
              update: {
                where: {
                  id: senderId,
                },
                data: {
                  hasSeenlatestMessage: true,
                },
              },
              updateMany: {
                where: {
                  NOT: {
                    userId: senderId,
                  },
                },
                data: {
                  hasSeenlatestMessage: false,
                },
              },
            },
          },
        });

        pubsub.publish("MESSAGE_SENT", { messageSent: newMessage });
        // pubsub.publish("CONVO_UPDATED", { convoUpdated: { convo } });
      } catch (error: any) {
        console.log("sendMessage Error", error);
        throw new GraphQLError(error.message);
      }

      return true;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        (_: any, __: any, context: GraphqlContext) => {
          const { pubsub } = context;
          return pubsub.asyncIterator(["MESSAGE_SENT"]);
        },
        (
          payload: messageSubscriptionPayload,
          args: { convoId: string },
          context: GraphqlContext
        ) => {
          return payload.messageSent.ConvoId === args.convoId;
        }
      ),
    },
  },
};

export const populatedMessages = Prisma.validator<Prisma.MessageInclude>()({
  sender: {
    select: {
      id: true,
      username: true,
    },
  },
});

export default resolvers;
