import { useContext, useEffect } from "react";
import { AuthContext } from "./auth-context";
import { useNavigate } from "react-router-dom";

export default function UserPrivateRoute({ children }) {
  const { userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  if (userRole === 2 || userRole == 1) {
    return children;
  } else {
    navigate("/");
  }
}
