import { createContext, useContext, useState } from "react";
export interface ContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: userProps | null;
  setUser: React.Dispatch<React.SetStateAction<userProps | null>>;
}

export type userProps = {
  createdAt?: string;
  email: string;
  isVerified: boolean;
  name: string;
  role: string;
  telephone: string;
  __v?: number;
  _id: string;
};
const AuthContext = createContext<ContextProps | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const storedUser = JSON.parse(localStorage.getItem("user") as string);
  const [user, setUser] = useState<userProps | null>(storedUser);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
