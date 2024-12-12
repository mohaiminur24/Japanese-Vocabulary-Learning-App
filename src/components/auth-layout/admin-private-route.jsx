import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout, user_info } from "../common/custom-hook";

export default function AdminPrivateRoute({ children }) {
  const user = user_info();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      logout();
      navigate("/");
    }
  }, [user, navigate]);

  if (user && (user.role === 1)) {
    return children;
  }
  return null;
}
