import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

interface IChatProps {
}

const Chat: React.FC<IChatProps> = (props) => {
  return (
    <div>CHAT
        <Button bg="brand.100" onClick={()=>signOut()} >Sign out</Button>
    </div>
  );
};

export default Chat;
