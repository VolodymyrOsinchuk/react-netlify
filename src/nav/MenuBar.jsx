import React, { useState, forwardRef } from "react";
import {
  NavLink as RouterLink,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import {
  Button,
  Drawer,
  Collapse,
  List,
  ListItem,
  Container,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import clsx from "clsx";
// import pages
import Home from "../pages/Home";
import About from "../pages/About";
import Calendar from "../pages/Calendar";
// import components
import menuItems from "./sideBarItems";
import useStyles from "./menuBarStyles";

const MenuBar = (props) => {
  const [menu, setMenu] = useState({});
  const { className, ...rest } = props;
  const classes = useStyles();

  const handleClick = (item) => {
    // console.log('item' , item)
    let newData = { ...menu, [item]: !menu[item] };
    setMenu(newData);
  };

  const CustomRouterLink = forwardRef((props, ref) => (
    <div ref={ref} style={{ flexGrow: 1 }}>
      <RouterLink {...props} />
    </div>
  ));

  const handleMenu = (children, level = 0) => {
    return children.map(({ children, name, url, links }) => {
      if (!children) {
        return (
          <List component="div" disablePadding key={name}>
            <ListItem
              sx={{
                display: "flex",
                pt: 0,
                pb: 0,
                width: "140px",
              }}
              disableGutters
              key={name}
            >
              <Button
                className={clsx({
                  [classes.btnRout]: true,
                  [classes.button]: true,
                  [classes.subMenu]: level,
                })}
                component={CustomRouterLink}
                to={url}
              >
                {name}
              </Button>
            </ListItem>
          </List>
        );
      }
      return (
        <div key={name}>
          <ListItem
            sx={{
              display: "flex",
              py: 0,
              width: "140px",
            }}
            disableGutters
            key={name}
            onClick={() => handleClick(name)}
          >
            <Button
              className={clsx({
                [classes.btnRout]: true,
                [classes.button]: true,
                [classes.subMenu]: level,
              })}
            >
              {name} {menu[name] ? <ExpandLess /> : <ExpandMore />}
            </Button>
          </ListItem>
          <Collapse in={menu[name] ? true : false} timeout="auto" unmountOnExit>
            {handleMenu(children, 1)}
          </Collapse>
        </div>
      );
    });
  };

  return (
    <Router>
      <Box component="div" sx={{ justifyContent: "left" }}>
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <List {...rest} className={clsx(classes.root, className)}>
            {handleMenu(menuItems.data)}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            backgroundColor: "cee2f3",
            color: "white",
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              p: 3,
            }}
          >
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/calendar" component={Calendar} />
            </Switch>
          </Container>
        </Box>
      </Box>
    </Router>
  );
};

export default MenuBar;
