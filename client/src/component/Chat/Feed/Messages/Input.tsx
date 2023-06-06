import { Box, Input } from "@chakra-ui/react";
import { Session } from "next-auth";
import * as React from "react";

interface InputProps {
  session: Session;
  convoId: string;
}

const MessageInput: React.FunctionComponent<InputProps> = ({
  session,
  convoId,
}) => {
  const [messageBody, setMessageBody] = React.useState<string>();

  return (
    <Box px={4} py={6} width="100%">
      <form>
        <Input
        size="md"
        placeholder="New message..."
        // _placeholder={{ opacity: 1, color: 'gray.500' }}
          value={messageBody}
          onChange={(event) => setMessageBody(event.target.value)}
          resize="none"
          _focus={{
            boxShadow:'none',
            border:'1px solid',
            borderColor:'whiteAlpha.300'
          }}
         
        />
      </form>
    </Box>
  );
};

export default MessageInput;
