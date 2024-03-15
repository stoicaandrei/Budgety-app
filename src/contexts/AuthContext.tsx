import { jwtDecode } from "jwt-decode";
import { ReactNode, createContext, useContext, useState } from "react";
import { login as loginRequest } from "@/requests";

type DecodedToken = {
  username: string;
  iat: number;
  fullName: string;
  _id: string;
};

const defaultToken = localStorage.getItem("authToken");
const defaultDecoded = defaultToken
  ? (jwtDecode(defaultToken) as DecodedToken)
  : null;

type AuthContextType = {
  token: string | null;
  user: DecodedToken | null;
  login: (username: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: defaultToken,
  user: defaultDecoded,
  login: () => {},
  logout: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(defaultToken);
  const [user, setUser] = useState(defaultDecoded);

  const login = async (username: string, password: string) => {
    const response = await loginRequest({ username, password });
    if (!response.token) return;

    const token = response.token;

    setToken(token);
    localStorage.setItem("authToken", token);
    const decoded = jwtDecode(token) as DecodedToken;
    setUser(decoded);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
