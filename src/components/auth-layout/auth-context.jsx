import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthenticatorContext({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const ContextValue = {
    isAdmin,
    loading,
  };

  return (
    <AuthContext.Provider value={ContextValue}>{children}</AuthContext.Provider>
  );
}
