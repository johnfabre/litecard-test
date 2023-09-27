import { createContext, useContext, useEffect, useState } from "react";
import { API_URLS } from "../+definitions/api.definition";
import { User } from "../+definitions/user.definition";

interface UserContextValue {
  user: User | undefined;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

interface UserProviderProps {
  children?: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);

  const fetchUser = async () => {
    const url = API_URLS.user.getById.replace("{userId}", "1");
    const response = await fetch(url);
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}> {children} </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
