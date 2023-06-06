import { Box, } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";
import convoOperations from "../../../graphql/operations/conversation";
import { useQuery } from "@apollo/client";
import { ConvoData } from "@/util/interface";
import { PopulatedConvos } from "../../../../../server/src/utils/types";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface ConversationWrapperProps {
  session: Session;
}

const ConversationWrapper: React.FC<ConversationWrapperProps> = ({
  session,
}) => {
  const {
    data: convoData,
    loading: convoLoading,
    error: convoError,
    subscribeToMore,
  } = useQuery<ConvoData>(convoOperations.Queries.convoQuery);

  const router = useRouter()
  const { query: { convoId } } = router;

  const onViewConvo = async ( convoId: string) => {
    router.push({ query: { convoId }})
  }

  
  const subscribeToNewConvo = () => {
    subscribeToMore({
      document: convoOperations.Subscriptions.createdConvo,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: { subscriptionData: { data: { createdConvo: PopulatedConvos } } }
      ) => {
        if (!subscriptionData.data) return prev;
        const newConvoItem = subscriptionData.data.createdConvo;
        console.log("Here is the subscription Data", subscriptionData.data);

        return Object.assign({}, prev, {
          convoQuery: [
            newConvoItem,
            ...prev.convoQuery,
          ],
        });
      },
    });
  }


  //Emmit Subscription when component mounts
  useEffect(() => {
    subscribeToNewConvo()
  }, []);

  
  return (
    <Box
      display={{ base: convoId ? "none" : "flex", md: "flex" }}
      width={{ base: "100%", md: "400px" }}
      bg="whiteAlpha.200"
      py={6}
      px={3}
    >
     { <ConversationList
        session={session}
        convoList={convoData?.convoQuery || []}
        onViewConvo={onViewConvo}
        
      />}
      
    </Box>
  );
};

export default ConversationWrapper;
