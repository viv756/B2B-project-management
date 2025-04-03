import useAuth from "@/hooks/use-auth";
import { UserType } from "@/types/api.types";
import { createContext, useContext } from "react";

type AuthContextType = {
  user?: UserType;
  isLoading: boolean;
  isFetching: boolean;
  error: any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    data: authData,
    error: authError,
    isLoading,
    isFetching,
  
  } = useAuth();

  const user = authData?.user;

  return (
    <AuthContext.Provider value={{ user, error: authError, isLoading, isFetching }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useCurrentUserContext must be used within a AuthProvider");
  }
  return context;
};
