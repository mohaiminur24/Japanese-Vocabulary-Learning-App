import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthenticatorContext({ children }) {
  const [userRole, setUserRole] = useState(1);
  const [loading, setLoading] = useState(false);

  // const admin = 1;
  // const user = 2;

  const ContextValue = {
    userRole,
    loading,
    setUserRole,
    setLoading
  };

  return (
    <AuthContext.Provider value={ContextValue}>{children}</AuthContext.Provider>
  );
}
