import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";

function AuthLayout() {
    return (
        <Box component="main" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: 4, background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 50%, #e0f2fe 100%)" }}>
            <Container maxWidth="xs">
                <Outlet />
            </Container>
        </Box>
    );
}

export default AuthLayout
