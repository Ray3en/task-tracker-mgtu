import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import { Box, CircularProgress } from "@mui/material";

export function PrivateRoute() {
  const { user, isAuthLoading } = useAuth();
  const location = useLocation();

  if (isAuthLoading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
