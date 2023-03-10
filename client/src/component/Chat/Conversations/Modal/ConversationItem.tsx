import { ConvoData } from "@/util/interface";
import { Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { PopulatedConvos } from "../../../../../../server/src/utils/types";

interface ConversationItemProps {
  singleConvo: PopulatedConvos;
}

const ConversationItem: React.FunctionComponent<ConversationItemProps> = ({
  singleConvo,
}) => {
  const {
    participants,
  } = singleConvo;

  return (
    <Stack p={4} _hover={{ bg: "whiteAlpha.300" }} borderRadius={4} >
      <Text fontSize="small" >
        Convo item
        {singleConvo.id}
      </Text>
    </Stack>
  );
};

export default ConversationItem;
