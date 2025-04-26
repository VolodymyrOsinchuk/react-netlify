import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

const CustomRouterLink = forwardRef((props, ref) => (
  <NavLink
    ref={ref}
    {...props}
    className={({ isActive }) =>
      [props.className, isActive ? "Mui-selected" : null]
        .filter(Boolean)
        .join(" ")
    }
  />
));

export default CustomRouterLink;
