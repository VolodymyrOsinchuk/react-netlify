import React from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Container,
  Link,
} from "@mui/material";
import coffee from "../assets/images/coffee.jpg";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: theme.palette.background.default,
        p: 3,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            px: { xs: 2, sm: 0 },
          }}
        >
          <Typography
            variant={isMobile ? "h4" : "h2"}
            component="h1"
            sx={{
              color: "text.primary",
              fontWeight: 700,
              mb: 3,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Bienvenue sur CoffeeMaster
          </Typography>

          <Typography
            variant={isMobile ? "body1" : "h5"}
            component="p"
            sx={{
              color: "text.secondary",
              maxWidth: "800px",
              mx: "auto",
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            Découvrez l'art du café avec nos sélections premium et nos recettes
            expertes
          </Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "1200px",
            mx: "auto",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: 3,
            "&:hover img": {
              transform: "scale(1.05)",
            },
          }}
        >
          <img
            src={coffee}
            alt="Art du café"
            style={{
              width: "100%",
              height: isMobile ? "300px" : "500px",
              objectFit: "cover",
              transition: "transform 0.3s ease-in-out",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: "rgba(0, 0, 0, 0.5)",
              p: 2,
              textAlign: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "common.white",
                fontSize: isMobile ? "0.8rem" : "1rem",
              }}
            >
              Photo par{" "}
              <Link
                href="https://unsplash.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: "primary.light",
                  "&:hover": { textDecoration: "none" },
                }}
              >
                Unsplash
              </Link>
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            size={isMobile ? "medium" : "large"}
            href="/products"
          >
            Voir nos produits
          </Button>
          <Button
            variant="outlined"
            size={isMobile ? "medium" : "large"}
            href="/about"
          >
            Notre histoire
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
