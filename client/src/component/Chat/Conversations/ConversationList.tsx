import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";

interface ConversationListProps {
  session: Session;
}

const ConversationList: React.FunctionComponent<ConversationListProps> = ({
  session,
}) => {
  return (
    <Box w="100% ">
      <Box py={2} px={4} mb={4} bg="blackAlpha.800" borderRadius={4} cursor="pointer" onClick={()=>{}} >
      <Text>Find or start a conversation</Text>
      </Box>
    </Box>
  );
};

export default ConversationList;
