import { useContext } from "react";
import { UserIdContext } from "../providers/UserIdProvider"; 

const useUserId = () => {
  const value = useContext(UserIdContext);

  return value;
}

export default useUserId;