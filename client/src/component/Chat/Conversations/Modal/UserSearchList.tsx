import { SearchedUsers } from "@/util/interface";
import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";

interface UserSearchListProps {
  users: Array<SearchedUsers>;
  addParticipants: (user: SearchedUsers) => void;
  removeParticipants: (userId: string) => void;
}

const UserSearchList: React.FC<UserSearchListProps> = ({
  users,
  addParticipants,
  removeParticipants,
}) => {
  return (
    <>
      {users.length == 0 ? (
        <Flex mt={6} justify="center">
          <Text>No users found</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map((user) => (
            <Stack
              key={user.id}
              direction="row"
              align="center"
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              _hover={{ bg: "whiteAlpha.200" }}
            >
              <Avatar src="" />
              <Flex justify="space-between" align="center" w="100%">
                <Text color="whiteAlpha.700">{user.username}</Text>
              </Flex>
              <Button
                p={4}
                bg="brand.100"
                _hover={{ bg: "brand.100" }}
                onClick={() => addParticipants(user)}
              >
                Select
              </Button>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default UserSearchList;
