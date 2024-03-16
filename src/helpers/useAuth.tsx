import { createContext, useContext, useState } from "react";

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

export interface ContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: userProps | null;
  setUser: React.Dispatch<React.SetStateAction<userProps | null>>;
}

export const AuthContext = createContext<ContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const [token, setToken] = useState<string | null>(
    storedToken !== null ? storedToken : null
  );

  const [user, setUser] = useState<userProps | null>(
    storedUser !== null ? JSON.parse(storedUser) : null
  );

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};







// import { createContext, useContext, useState } from "react";

// export type userProps = {
//   createdAt?: string;
//   email: string;
//   isVerified: boolean;
//   name: string;
//   role: string;
//   telephone: string;
//   __v?: number;
//   _id: string;
// };

// export interface ContextProps {
//   token: string | null;
//   setToken: React.Dispatch<React.SetStateAction<string | null>>;
//   user: userProps | null;
//   setUser: React.Dispatch<React.SetStateAction<userProps | null>>;
// }

// export const AuthContext = createContext<ContextProps | undefined>(undefined);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [token, setToken] = useState<string | null>(
//     localStorage.getItem("token")
//   );
//   const storedUser = JSON.parse(localStorage.getItem("user") as string);
//   const [user, setUser] = useState<userProps | null>(storedUser);

//   return (
//     <AuthContext.Provider value={{ token, setToken, user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
