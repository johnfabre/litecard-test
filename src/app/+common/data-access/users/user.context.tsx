import { isNil } from "lodash-es";
import { createContext, useContext, useState } from "react";
import { Maybe } from "../../definitions/common.definition";
import { User } from "../../definitions/user.definition";
import { Hooks } from "../../utils/hooks";
import { UserData } from "./user.data";

type UserContextType = Maybe<User>;

export interface UserContext {
  user: Maybe<User>;
  refresh: () => Promise<void>;
  updateUserState: (user: Maybe<User>) => void;
}

const userContext = createContext<Maybe<UserContext>>(null);

interface UserProviderProps {
  children?: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserContextType>(null);

  const loadProvidedUser = async () => {
    const latestUser = await UserData.fetchUser(1);
    setUser(latestUser);
  };

  const updateUserState = (user: Maybe<User>) => {
    setUser(user);
  };

  // got annoyed by this triggering twice
  Hooks.useEffect(() => {
    loadProvidedUser();
  }, []);

  return (
    <userContext.Provider
      value={{ user, refresh: loadProvidedUser, updateUserState }}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  const context = useContext(userContext);
  if (isNil(context)) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
}
