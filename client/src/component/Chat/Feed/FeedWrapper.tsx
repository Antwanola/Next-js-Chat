import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import * as React from "react";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FunctionComponent<FeedWrapperProps> = ({
  session,
}) => {
  const router = useRouter();

  const { convoId } = router.query;
  return (
    <Flex
      display={{ base: convoId ? "flex" : "none", md: "flex" }}
      w="100%"
      px={20}
      direction="column"
      border="1px red solid"
    >
      {convoId ? <Flex>{convoId}</Flex> : <div>No Conversation Selected</div>}
    </Flex>
  );
};

export default FeedWrapper;
