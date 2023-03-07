import { SearchedUsers } from "@/util/interface";
import { useMutation } from "@apollo/client";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

interface ParticipantsProps {
  participants: Array<SearchedUsers>;
  isLoading: boolean
  makeConvo: () => void
  removeParticipants: (userId: string) => void;
}

const Participants: React.FC<ParticipantsProps> = ({
  participants,
  isLoading,
  makeConvo,
  removeParticipants,
}) => {

  return (
    <Flex mt={4} gap={10} flexWrap="wrap">
      {participants.map((participant) => (
        <>
          <Stack
            direction="row"
            align="center"
            borderRadius={4}
            p={2}
            bg="whiteAlpha.200"
            key={participant.id}
          >
            <Text>{participant.username}</Text>
            <IoIosCloseCircleOutline
              cursor="pointer"
              onClick={() => removeParticipants(participant.id)}
            />
          </Stack>
          <Button
            bg="brand.100"
            w="100%"
            _hover={{ bg: "brand.100" }}
            isLoading={isLoading}
            onClick={makeConvo}
          >
            Create Conversation
          </Button>
        </>
      ))}
    </Flex>
  );
};

export default Participants;
