import { useRouteError } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";

export default function ErrorPage() {
  const error = useRouteError();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  console.error(error);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: "center",
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
          }}
        >
          <Typography
            variant={isMobile ? "h4" : "h2"}
            component="h1"
            sx={{
              mb: 2,
              color: theme.palette.error.main,
              fontWeight: "bold",
            }}
          >
            Oups! Une erreur est survenue
          </Typography>

          <Typography
            variant={isMobile ? "body1" : "h6"}
            component="p"
            sx={{ mb: 3 }}
          >
            Désolé, une erreur inattendue s'est produite.
          </Typography>

          <Typography
            variant="body2"
            component="p"
            sx={{
              mb: 4,
              color: theme.palette.text.secondary,
              fontStyle: "italic",
            }}
          >
            {error.statusText || error.message}
          </Typography>

          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            href="/"
            sx={{
              px: 4,
              py: 2,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Retour à l'accueil
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
