import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useState } from "react";
import ConversationalModal from "./Modal/ConversationalModal"

interface ConversationListProps {
  session: Session;
}

const ConversationList: React.FC<ConversationListProps> = ({
  session,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = ()=>setIsOpen(true)
  const onClose = ()=> setIsOpen(!isOpen)

  return (
    <Box w="100%">
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.800"
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
          Find or start a conversation
        </Text>
      </Box>
      <ConversationalModal isOpen={isOpen} onClose={onClose} session={session} />
    </Box>
  );
};

export default ConversationList;
