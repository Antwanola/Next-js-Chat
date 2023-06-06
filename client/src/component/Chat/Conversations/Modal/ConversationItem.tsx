import {
  Stack,
  Text,
  Avatar,
  Box,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  position,
} from "@chakra-ui/react";
import { PopulatedConvos } from "../../../../../../server/src/utils/types";
import { formatRelative } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { formatUsername } from "@/util/functions";

interface formatRelativeLocale {
  lastweek: "eeee",
  yesterday: "'Yesterday'",
  today: "p",
  other: "MM/dd/yy",
};
interface convoItemProps {
  userId: string;
  singleConvo: PopulatedConvos;
  onClick:()=> void;
  isSelected: boolean;
  selectedConvoId: Object;
}

const ConversationItem: React.FC<convoItemProps> = ({
  singleConvo,
  userId,
  onClick,
  isSelected,
  selectedConvoId,
}) => {
  const [menuOpen, setmenuOpen] = useState(false);
  const handleClick = (event: React.MouseEvent) => {
    if (event.type == "click") {
      onClick();
    } else if (event.type == "contextmenu") {
      event.preventDefault();
      setmenuOpen(true);
    }
  };
  console.log(singleConvo);

  formatRelative: (token) =>{
    formatRelativeLocale[
      token as keyof typeof formatRelativeLocale
    ]
  }


  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      p={4}
      w="100%"
      cursor="pointer"
      bg={isSelected ? "whiteAlpha.200" : "none"}
      _hover={{ bg: "whiteAlpha.200" }}
      onClick={handleClick}
      position="relative">
      <Menu isOpen={menuOpen} onClose={() => setmenuOpen(false)}>
        <MenuList bg="#2d2d2d">
          <MenuItem
            icon={<AiOutlineEdit fontSize={28} />}
            onClick={(event) => {
              event.stopPropagation();
            }}>
            Edit
          </MenuItem>
          {singleConvo.participants.length > 2 ? (
            <MenuItem
              icon={<BiLogOut fontSize={20} />}
              onClick={(event) => event.stopPropagation()}>
              Leave
            </MenuItem>
          ) : (
            <MenuItem
              icon={<MdDeleteOutline fontSize={20} />}
              onClick={(event) => event.stopPropagation()}>
              Delete
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <Avatar size="sm" />
      <Flex justify="space-between" width="100%" height="100%">
        <Flex direction="column" width="70%" height="100%">
          <Text
            fontWeight={500}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="elipsis">
            {formatUsername(singleConvo.participants, userId)}
          </Text>
          {singleConvo.latestMessage && (
            <Box width="140%">
              <Text
                color="whiteAlpha.700"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="elipsis">
                {singleConvo.latestMessage.body}
              </Text>
            </Box>
          )}
        </Flex>
        <Text color="whiteAlpha.700" textAlign="right" fontSize={10}>
          {formatRelative(new Date(singleConvo.updatedAt),new Date(), 
           {
            locale: {
              ...enUS,
            },
          }
          )}
        </Text>
      </Flex>
    </Stack>
  );
};

export default ConversationItem;
