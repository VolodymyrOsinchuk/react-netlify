import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  drawerPaper: {
    width: 240,
    backgroundColor: theme.palette.background.default,
    borderRight: "none",
  },
  list: {
    padding: theme.spacing(2),
  },
  listItem: {
    padding: 0,
    marginBottom: theme.spacing(0.5),
  },
  menuButton: {
    justifyContent: "flex-start",
    textTransform: "none",
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  main: {
    flexGrow: 1,
    padding: theme.spacing(4),
    marginLeft: 240,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));
