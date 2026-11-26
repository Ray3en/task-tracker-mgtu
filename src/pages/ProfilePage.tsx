import { Container, Typography } from "@mui/material";

function ProfilePage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
      <Typography variant="overline" color="text.secondary">
        Личный кабинет
      </Typography>
     
    </Container>
  );
}

export default ProfilePage;
