import { useMutation } from "@apollo/client";
import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
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
  const [userCreation, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUserName);

  const onSubmit = async () => {
    if(!username) return;
    try {
      const { data } = await userCreation({ variables: { username } });
      if(!data?.createUserName){
        throw new Error()
      }
      if(data.createUserName.error){
        const { createUserName: {error}} = data
        throw new Error(error)
      }
      /**
      *Reload session to obtain username and add a toast :fire
      */
     toast.success("Username addedd successfully!")
      reloadSession();
    } catch (error) {
      toast.error("Error setting username. Please try again.")
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
            <Button bg="brand.100" width="100%" onClick={onSubmit} isLoading={loading} >
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
