import React, { useState, forwardRef } from "react";
import {
  Button,
  Drawer,
  Collapse,
  List,
  ListItem,
  Container,
  CssBaseline,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import {
  NavLink as RouterLink,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import clsx from "clsx";
import menuItems from "./sideBarItems";
import UseStyles from "./menuBarStyles";
import Home from "../pages/Home";
import About from "../pages/About";
import { Test3 } from "../pages/Test3";

const MenuBar = (props) => {
  const [menu, setMenu] = useState({});
  const { className, ...rest } = props;
  const classes = UseStyles();

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
              className={classes.item}
              disableGutters
              style={{ padding: "0px" }}
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
            className={classes.item}
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
      <div className={clsx(classes.root1)}>
        <CssBaseline />
        <Drawer variant="permanent" classes={{ paper: classes.drawer }}>
          <List {...rest} className={clsx(classes.root, className)}>
            {handleMenu(menuItems.data)}
          </List>
        </Drawer>
        <main className={classes.main}>
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/test3" component={Test3} />
            </Switch>
            {/* <App /> */}
          </Container>
        </main>
      </div>
    </Router>
  );
};

export default MenuBar;
