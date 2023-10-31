import { createContext, useEffect, useState } from "react";

interface User {
  email: string;
}

interface UserContextValue {
  user: User | null;
}

interface UserContextProviderProps {
  children: React.ReactNode;
}

const initialUserContextValue: UserContextValue = {
  user: null,
};

export const UserContext = createContext<UserContextValue>(initialUserContextValue);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setUser({ email: "JohnDoe@JohnDoe.com" });
    }, 2000);
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
