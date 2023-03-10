import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";
import convoOperations from "../../../graphql/operations/conversation";
import { useQuery } from "@apollo/client";
import { ConvoData } from "@/util/interface";

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
  } = useQuery<ConvoData>(convoOperations.Queries.convoQuery);

  console.log("Convo data queried", convoData);
  return (
    <Box
      width={{ base: "100%", md: "400px" }}
      bg="whiteAlpha.200"
      py={6}
      px={3}
    >
      <ConversationList session={session} convoList={convoData?.convoQuery || []} />      
    </Box>
  );
};

export default ConversationWrapper;
