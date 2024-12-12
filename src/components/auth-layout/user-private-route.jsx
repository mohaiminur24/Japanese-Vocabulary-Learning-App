import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout, user_info } from "../common/custom-hook";

export default function UserPrivateRoute({ children }) {
  const user = user_info();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      logout();
      navigate("/");
    };
  }, [user, navigate]);

  if (user && (user.role === 1 || user.role === 2)) {
    return children;
  }
  return null;
}
