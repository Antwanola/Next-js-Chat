import { Button, Flex } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import ConversationWrapper from "./Conversations/conversationWrapper";
import FeedWrapper from "./Feed/FeedWrapper";


interface IChatProps {
  session: Session
}

const Chat: React.FC<IChatProps> = ({session}) => {
  return (
    <Flex height="100vh" w="100%">
      <ConversationWrapper session={session}/>
      <FeedWrapper session={session} />
    </Flex>
  );
};

export default Chat;
