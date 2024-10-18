import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import common from "../../lib/common";

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!common.isLoggedIn()) {
      navigate("/", { replace: true });
    }
  }, []);

  return (children);
};
