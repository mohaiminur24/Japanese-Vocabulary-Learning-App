import { useNavigate } from "react-router-dom";

export const user_info = () => {
  const res = localStorage.getItem("user");
  if (res) {
    const parse = JSON.parse(res);
    return parse;
  } else {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access-token");
};
