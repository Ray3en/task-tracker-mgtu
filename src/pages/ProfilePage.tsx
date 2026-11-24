import { useQuery } from "@tanstack/react-query";
import { Alert, Box, Button, CircularProgress, Container, Divider, Stack, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import { Navigate, useNavigate } from "react-router";
import { getProfile, logout as logoutRequest } from "../api/auth.api";

function ProfilePage() {
  const navigate = useNavigate();
  const { data: user, isPending, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });

  if (isPending) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isAxiosError(error) && error.response?.status === 401) {
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" replace />;
  }

  if (error || !user) {
    return <Alert severity="error">Не удалось загрузить профиль</Alert>;
  }

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      localStorage.removeItem("accessToken");
      navigate("/login", { replace: true });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
      <Typography variant="overline" color="text.secondary">
        Личный кабинет
      </Typography>
      <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
        {user.name}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Stack spacing={2.5}>
        <Box>
          <Typography variant="caption" color="text.secondary">Email</Typography>
          <Typography variant="h6">{user.email}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">ID пользователя</Typography>
          <Typography variant="h6">{user.id}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">Дата регистрации</Typography>
          <Typography variant="h6">
            {new Date(user.createdAt).toLocaleDateString("ru-RU")}
          </Typography>
        </Box>
        <Button variant="outlined" color="error" onClick={logout} sx={{ alignSelf: "flex-start" }}>
          Выйти
        </Button>
      </Stack>
    </Container>
  );
}

export default ProfilePage;
