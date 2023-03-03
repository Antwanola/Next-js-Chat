import { SearchedUsers } from "@/util/interface";


interface  UserSearchListProps {
    users: Array<SearchedUsers>
}

const UserSearchList: React.FC< UserSearchListProps> = ({users}) => {
  return <div>{users.length}</div>;
};

export default UserSearchList;
