import { Navigate } from "react-router-dom";
import { supabase } from "./supabase";

const ProtectedRoute = ({ children }) => {
  const session = supabase.auth.getSession();
  if (!session.data?.session) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
