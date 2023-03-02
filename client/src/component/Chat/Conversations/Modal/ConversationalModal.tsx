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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConversationalModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [searchUsers, { loading, error, data}] = useLazyQuery<SearchUsernameData, SearchUsernameInput>(UserOperations.Queries.searchUsers)
  
  const onSearch = (event: React.FormEvent) => {
    event.preventDefault()
    searchUsers({variables: {username}})
    console.log("Hey Form");
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <Button type="submit" disabled={!username} >
                  Search
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationalModal;
