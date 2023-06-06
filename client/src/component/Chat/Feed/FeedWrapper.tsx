import { Button, Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import MessagesHeader from "./Messages/MessagesHeader";
import * as React from "react";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FunctionComponent<FeedWrapperProps> = ({
  session,
}) => {
  const router = useRouter();

  const { convoId } = router.query;
  const { user: {id: userId} } = session;
  console.log(userId);
  return (
    <Flex
      display={{ base: convoId ? "flex" : "none", md: "flex" }}
      w="100%"
      px={2}
      direction="column"
      border="1px red solid">
      {convoId && typeof convoId =="string" ? (
        <Flex
          direction="column"
          justify="space-between"
          overflow="hidden"
          flexGrow={1}
          >
          {/* {convoId} */}
          <MessagesHeader userId={userId} convoId={convoId}/>
          {/* <Messages/> */}
        </Flex>
      ) : (
        <div>No Conversation Selected</div>
      )}
    </Flex>
  );
};

export default FeedWrapper;
