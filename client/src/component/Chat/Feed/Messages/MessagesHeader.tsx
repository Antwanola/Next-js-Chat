import { useQuery } from "@apollo/client";
import { Button, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import ConversationOperations from "../../../../graphql/operations/conversation";
import { formatUsername } from "../../../../util/functions";
import { ConvoData } from "../../../../util/interface";
// import SkeletonLoader from "../../../common/SkeletonLoader";

interface MessagesHeaderProps {
  userId: string;
  convoId: string;
}

const MessagesHeader: React.FC<MessagesHeaderProps> = ({
  userId,
  convoId,
}) => {
  const router = useRouter();
  const { data, loading } = useQuery<ConvoData, null>(
    ConversationOperations.Queries.convoQuery
  );

  const conversation = data?.convoQuery.find(
    (conversation) => conversation.id === convoId
  );

  if (data?.convoQuery && !loading && !conversation) {
    router.replace(process.env.NEXT_PUBLIC_BASE_URL as string);
  }

  return (
    <Stack
      direction="row"
      align="center"
      spacing={6}
      py={5}
      px={{ base: 4, md: 0 }}
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Button
        display={{ md: "none" }}
        onClick={() =>
          router.replace("?conversationId", "/", {
            shallow: true,
          })
        }
      >
        Back
      </Button>
      {/* {loading && <SkeletonLoader count={1} height="30px" width="320px" />} */}
      {!conversation && !loading && <Text>Conversation Not Found</Text>}
      {conversation && (
        <Stack direction="row">
          <Text color="whiteAlpha.600">To: </Text>
          <Text fontWeight={600}>
            {formatUsername(conversation.participants, userId)}
          </Text>
        </Stack>
      )}
    </Stack>
  );
};
export default MessagesHeader;