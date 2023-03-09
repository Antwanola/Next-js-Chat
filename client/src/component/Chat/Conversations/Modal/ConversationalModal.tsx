import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Modal,
  Stack,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import UserOperations from "@/graphql/operations/user";
import {
  CreateConvoData,
  CreateConvoInputs,
  SearchedUsers,
  SearchUsernameData,
  SearchUsernameInput,
} from "@/util/interface";
import UserSearchList from "./UserSearchList";
import Participants from "./Participants";
import conversation from "@/graphql/operations/conversation";
import { toast } from "react-toastify";
import { Session } from "next-auth";
import { useRouter } from "next/router";

interface ModalProps {
  isOpen: boolean;
  session: Session;
  onClose: () => void;
}

const ConversationalModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  session,
}) => {
  const {
    user: { id: userId },
  } = session;

  const router = useRouter()
  const [username, setUsername] = useState("");

  const [participants, setParticipants] = useState<Array<SearchedUsers>>([]);

  const [searchUsers, { loading, error, data }] = useLazyQuery<
    SearchUsernameData,
    SearchUsernameInput
  >(UserOperations.Queries.searchUsers);

  const [createConvo, { loading: createConvoloading }] = useMutation<
    CreateConvoData,
    CreateConvoInputs
  >(conversation.Mutations.createConvo);

  const makeConvo = async () => {
    const participantIds = [userId, ...participants.map((p) => p.id)];

    try {
      const { data } = await createConvo({ variables: { participantIds } });
      console.log("convo data", data?.createConvo);
      if(!data?.createConvo.convoId){
         throw new Error("Failed to create conversation")
      }
      else {
        const { createConvo :{ convoId }} = data
        router.push({query: {convoId}})
        console.log("convo data", data);
        setParticipants([])
        setUsername("")
        onClose()
      }

     
    } catch (error: any) {
      console.log("Error from createConvo", { error });
      toast.error(error.message);
    }
  };
  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    searchUsers({ variables: { username } });
  };

  const addParticipants = (user: SearchedUsers) => {
    let existingUser;
    participants.map((p) => {
      if (p.id === user.id) {
        return (existingUser = p.id);
      }
    });
    if (existingUser === user.id) {
      return toast("User already added to conversation list!");
    }
    setParticipants((prev) => [...prev, user]);
    setUsername("");
  };

  const removeParticipants = (userId: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== userId));
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader>Create Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <Button type="submit" disabled={!username} isLoading={loading}>
                  Search
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && (
              <UserSearchList
                users={data.searchUsers}
                removeParticipants={removeParticipants}
                addParticipants={addParticipants}
              />
            )}
            {participants.length !== 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipants={removeParticipants}
                  isLoading={createConvoloading}
                  makeConvo={makeConvo}
                />
                <Button
                  bg="brand.100"
                  mt={4}
                  w="100%"
                  _hover={{ bg: "brand.100" }}
                  isLoading={createConvoloading}
                  onClick={makeConvo}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationalModal;
