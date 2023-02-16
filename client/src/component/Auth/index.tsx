import { useMutation } from "@apollo/client";
import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import gLogo from "../../../public/images/gLogo.png";
import UserOperations from "../../graphql/operations/user";
import {
  CreateUsernameData,
  CreateUsernameVariables,
} from "../../util/interface";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");
  const [userCreation, { data, loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUserName);


  console.log( "The data from createUserName ", {data},{Error:data}, {Loading:loading}, {Error:error});

  const onSubmit = async () => {
    try {
      console.log(username);
      if(!username) return;
      await userCreation({ variables: { username } });
    } catch (error) {
      console.log(`onSubmit error`, error);
    }
  };

  return (
    <Center height="100vh">
      <Stack align="center" spacing={4}>
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Button bg="brand.100" width="100%" onClick={onSubmit}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">MessengerQl</Text>
            <Button
              bg="blackAlpha.600"
              rightIcon={<Image height="20px" src="/images/gLogo.png" />}
              onClick={() => signIn("google")}
            >
              Continue with google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
