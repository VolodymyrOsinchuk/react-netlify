import React, {useState, forwardRef} from "react";
import {
Button,
Drawer,
Collapse,
List,
ListItem
} from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore
} from "@material-ui/icons";
import {NavLink as RouterLink} from "react-router-dom";
import clsx from "clsx";
import menuItems from "./sideBarItems";
import UseStyles from "./menuBarStyles";

const MenuBar = (props) => {
  const [menu, SetMenu] = useState({});
  const {className, ...rest} = props;
  const classes = UseStyles();

  const handleClick = (item) => {
    let newData = {...menu, [item] : !menu[item]};
    setMenu(newData);
  }

  const CustomRouterLink = forwardRef((props, ref) => (
    <div ref={ref} style={{flexGrow:1}}>
      <RouterLink {...props}/>
    </div>
  ));

  const handleMenu = (children, level=0) => {
    return children.map(({children, name, url, links}) => {
      if (!children) {
        return (
          <List>
            <ListItem>
              <Button>

              </Button>
            </ListItem>
          </List>
        )
      }
      return (
        <div>
          <ListItem>
            <Button>

            </Button>
          </ListItem>
          <Collapse>
          </Collapse>
        </div>
      )
    })
  }

  return(
    <Drawer>
      <List>

      </List>
    </Drawer>
  )
}

export default MenuBar;