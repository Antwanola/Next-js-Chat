import { ConvoData } from "@/util/interface";
import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { PopulatedConvos } from "../../../../../server/src/utils/types";
import ConversationalModal from "./Modal/ConversationalModal";
import ConversationItem from "./Modal/ConversationItem";

interface ConversationListProps {
  session: Session;
  convoList: Array<PopulatedConvos>;
  onViewConvo: (
    convoId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  session,
  convoList,
  onViewConvo,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [editingConvo, setEditingConvo] =
    useState<PopulatedConvos | null>(null);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(!isOpen);

  const router = useRouter()

  const { convoId } = router.query

  console.log("convo Id from query",convoId);
  const { user: {id: userId }} = session


  // const onEditConversation = (convo: PopulatedConvos) => {
  //   setEditingConvo(convo);
  //   openModal();
  // }

  // const onLeaveConversation = async (convo: PopulatedConvos) => {
  //   const participantIds = convo.participants
  //   .filter((p) => p.user.id !== userId)
  //     .map((p) => p.user.id);

  //   try {
  //     const { data, errors } = await updateParticipants({
  //       variables: {
  //         conversationId: conversation.id,
  //         participantIds,
  //       },
  //     });

  //     if (!data || errors) {
  //       throw new Error("Failed to update participants");
  //     }
  //   } catch (error: any) {
  //     console.log("onUpdateConversation error", error);
  //     toast.error(error?.message);
  //   }
  // };

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
      {convoList.map((convo, index) => (
        <ConversationItem
          key={index}
          userId={userId}
          singleConvo={convo}
          onClick={() => onViewConvo(convo.id)}
          isSelected={convo.id === router.query.convoId}
          selectedConvoId={convo.id}

        />
      ))}
    </Box>
  );
};

export default ConversationList;
