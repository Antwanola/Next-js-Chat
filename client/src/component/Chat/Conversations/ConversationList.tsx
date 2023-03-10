import { ConvoData } from "@/util/interface";
import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useState } from "react";
import { PopulatedConvos } from "../../../../../server/src/utils/types";
import ConversationalModal from "./Modal/ConversationalModal";
import ConversationItem from "./Modal/ConversationItem";

interface ConversationListProps {
  session: Session;
  convoList: Array<PopulatedConvos>;
}

const ConversationList: React.FC<ConversationListProps> = ({
  session,
  convoList,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(!isOpen);
  console.log("From ConvonList", convoList);
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
        <ConversationalModal
          isOpen={isOpen}
          onClose={onClose}
          session={session}
        />
      </Box>
      {convoList.map((convo) => (
        <ConversationItem key={convo.id} singleConvo={convo} />
      ))}
    </Box>
  );
};

export default ConversationList;
