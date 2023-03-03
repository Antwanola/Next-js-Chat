import { useLazyQuery, useQuery } from "@apollo/client";
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
import { SearchUsernameData, SearchUsernameInput } from "@/util/interface";
import UserSearchList from "./UserSearchList";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConversationalModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [searchUsers, { loading, error, data}] = useLazyQuery<SearchUsernameData, SearchUsernameInput>(UserOperations.Queries.searchUsers)
  // console.log("Here is the searched users", data);

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault()
    searchUsers({variables: {username}})
    
  }
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
           {data?.searchUsers && <UserSearchList users={data.searchUsers} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationalModal;
