import { ParticipantPopulated } from "../../../server/src/utils/types";

export const formatUsername = (
  participants: Array<ParticipantPopulated>,
  myUserId: String
): string => {
  const username = participants
    .filter((participant) => participant.user.id !== myUserId)
    .map((participant) => participant.user.username);

  return username.join(", ");
};
