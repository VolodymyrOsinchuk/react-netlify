import React from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO",
    avatar: "/static/images/avatar/1.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Jane Smith",
    role: "CTO",
    avatar: "/static/images/avatar/2.jpg",
    bio: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Alex Johnson",
    role: "Lead Developer",
    avatar: "/static/images/avatar/3.jpg",
    bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
];

export default function About() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant={isMobile ? "h4" : "h2"}
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 2,
          }}
        >
          À propos de nous
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            maxWidth: "800px",
            mx: "auto",
            color: "text.secondary",
            lineHeight: 1.6,
          }}
        >
          Nous sommes une équipe passionnée dédiée à fournir les meilleures
          solutions technologiques. Notre mission est d'innover et de créer des
          produits qui changent le monde.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {teamMembers.map((member) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={member.name}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Avatar
              src={member.avatar}
              sx={{
                width: theme.spacing(16),
                height: theme.spacing(16),
                mb: 2,
              }}
            />
            <Typography variant="h6" component="h3" gutterBottom>
              {member.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              gutterBottom
              sx={{ mb: 1 }}
            >
              {member.role}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: "300px" }}
            >
              {member.bio}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          mt: 6,
          p: 4,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Notre mission
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Nous croyons en la puissance de la technologie pour résoudre les
          problèmes complexes. Notre approche combine innovation, design et
          fonctionnalité pour créer des solutions qui améliorent la vie
          quotidienne de nos utilisateurs.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              height: "300px",
              backgroundImage: "url(/static/images/about/office1.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 2,
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Notre espace de travail
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Un environnement moderne conçu pour favoriser la créativité et la
            collaboration. Nous investissons dans des espaces qui inspirent
            l'innovation et le travail d'équipe.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
