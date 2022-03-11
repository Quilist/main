import { useMemo } from "react";
import { createContext, useState } from "react";

export const EmployeeIdContext = createContext();

export const EmployeeIdProvider = ({children}) => {
  const [employeeId, setEmployeeId] = useState(0);
  const value = useMemo(() => ({employeeId, setEmployeeId}), [employeeId]);

  return (
    <EmployeeIdContext.Provider value={value}>
      {children}
    </EmployeeIdContext.Provider>
  )
}