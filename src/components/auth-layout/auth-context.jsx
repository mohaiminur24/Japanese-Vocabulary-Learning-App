import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthenticatorContext({ children }) {
  const [userRole, setUserRole] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser]=useState(null);

  // const admin = 1;
  // const user = 2;

  const ContextValue = {
    userRole,
    loading,
    user,
    setUserRole,
    setLoading,
    setUser
  };

  return (
    <AuthContext.Provider value={ContextValue}>{children}</AuthContext.Provider>
  );
}
