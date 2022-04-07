import { useMemo } from "react";
import { createContext, useState } from "react";

export const UserIdContext = createContext();

export const UserIdProvider = ({children}) => {
  const [userId, setUserId] = useState(0);
  const value = useMemo(() => ({userId, setUserId}), [userId]);

  return (
    <UserIdContext.Provider value={value}>
      {children}
    </UserIdContext.Provider>
  )
}