import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";


interface IChatProps {
  userSession: Session
}

const Chat: React.FC<IChatProps> = ({userSession}) => {
  return (
    <div>CHAT
      {userSession?.user.username}
        <Button bg="brand.100" onClick={()=>signOut()} >Sign out</Button>
    </div>
  );
};

export default Chat;
