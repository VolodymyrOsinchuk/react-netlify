import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const rootTheme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  drawerPaper: {
    width: 240,
    backgroundColor: (theme) => theme.palette.background.default,
    borderRight: "none",
  },
  list: {
    padding: (theme) => theme.spacing(2),
  },
  listItem: {
    padding: 0,
    marginBottom: (theme) => theme.spacing(0.5),
  },
  menuButton: {
    justifyContent: "flex-start",
    textTransform: "none",
    padding: (theme) => theme.spacing(1, 2),
    borderRadius: (theme) => theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: (theme) => theme.palette.action.hover,
    },
  },
  main: {
    flexGrow: 1,
    padding: (theme) => theme.spacing(4),
    marginLeft: 240,
  },
  container: {
    paddingTop: (theme) => theme.spacing(4),
    paddingBottom: (theme) => theme.spacing(4),
  },
});

export default rootTheme;
