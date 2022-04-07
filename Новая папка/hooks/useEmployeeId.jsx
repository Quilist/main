import { useContext } from "react";
import { EmployeeIdContext } from "../providers/EmployeeIdProvider"; 

const useEmployeeId = () => {
  const value = useContext(EmployeeIdContext);

  return value;
}

export default useEmployeeId;