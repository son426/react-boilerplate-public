import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const useAuth = () => {
  return { user: "user" };
};

export function AuthGuard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign-in", { replace: true });
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return <Outlet />;
}
