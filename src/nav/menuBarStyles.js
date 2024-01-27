// import {makeStyles} from "@material-ui/styles";
import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

// import { colors } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "left",
  },
  root1: {
    display: "flex",
  },
  drawer: {
    position: "relative",
    whiteSpace: "nowrap",
    width: 240,
    background: "rgb(234, 236, 238)",
    color: "#fff",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
    width: 140,
  },
  button: {
    color: blueGrey.A700,
    padding: "10px 8 px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
  },
  btnRoot: {
    paddingLeft: "25px",
    justifyContent: "left !important",
  },
  subMenu: {
    paddingLeft: "50px !important",
  },
  main: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    backgroundColor: "cee2f3",
    color: "white",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default useStyles;
