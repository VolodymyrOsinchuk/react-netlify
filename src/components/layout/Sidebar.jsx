// Sidebar.jsx
import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  Button,
  Collapse,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  MenuBook,
  CalendarToday,
  Dashboard,
} from "@mui/icons-material";
import menuItems from "./menuItems";
import CustomRouterLink from "../CustomRouterLink";

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const renderMenuItems = (items, level = 0) =>
    items.map(({ name, url, children }) => (
      <div key={name}>
        <ListItem disableGutters sx={{ p: 0, mb: 0.5, paddingLeft: level * 2 }}>
          <Button
            fullWidth
            component={url ? CustomRouterLink : "button"}
            to={url}
            onClick={() => children && toggleMenu(name)}
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              px: 2,
              py: 1.5,
              borderRadius: 2,
              color: level > 0 ? "text.secondary" : "text.primary",
              "&:hover": {
                backgroundColor: "action.hover",
              },
              transition: "all 0.2s ease",
              fontSize: level > 0 ? "0.9rem" : "1rem",
              fontWeight: level > 0 ? 400 : 500,
              ...(isMobile && level === 0 ? { justifyContent: "center" } : {}), // Center items in mobile view
            }}
            startIcon={getIcon(name)}
            endIcon={
              children && (openMenus[name] ? <ExpandLess /> : <ExpandMore />)
            }
          >
            {name}
          </Button>
        </ListItem>
        {children && (
          <Collapse
            in={openMenus[name]}
            timeout="auto"
            unmountOnExit
            sx={{ pl: 2 }}
          >
            <List component="div" disablePadding>
              {renderMenuItems(children, level + 1)}
            </List>
          </Collapse>
        )}
      </div>
    ));

  const getIcon = (name) => {
    switch (name.toLowerCase()) {
      case "dashboard":
        return <Dashboard sx={{ mr: 1.5 }} />;
      case "calendrier":
        return <CalendarToday sx={{ mr: 1.5 }} />;
      default:
        return <MenuBook sx={{ mr: 1.5 }} />;
    }
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"} // Use temporary drawer on mobile
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          bgcolor: "#e0e0e0",
          borderRight: "none",
          boxShadow: theme.shadows[4],
        },
      }}
      // Customize the drawer props for mobile
      ModalProps={isMobile ? { keepMounted: true } : undefined}
    >
      <Box sx={{ p: 3, pb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            color: "primary.main",
          }}
        >
          <Dashboard sx={{ mr: 1, fontSize: "2rem" }} />
          MyApp
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", display: "block", mt: 0.5 }}
        >
          Version 2.0
        </Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ overflow: "auto", flexGrow: 1 }}>
        <List sx={{ p: 2 }}>{renderMenuItems(menuItems)}</List>
      </Box>
      <Divider sx={{ mt: "auto" }} />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            textTransform: "none",
            color: "text.secondary",
            borderColor: "divider",
          }}
        >
          Aide & Support
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
