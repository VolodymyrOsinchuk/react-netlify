// MainLayout.jsx
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#e0e0e0", // Light gray background
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // ml: { xs: 0, md: "240px" }, // Responsive margin
          transition: "margin 0.3s ease",
          p: 3,
          backgroundColor: "background.paper", // Moved background to main Box
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            borderRadius: 4,
            boxShadow: 1,
            minHeight: "calc(100vh - 64px)",
            px: 3, // Padding on X axis
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
