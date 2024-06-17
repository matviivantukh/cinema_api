import { NavLink } from "react-router-dom";

import classes from "./SideBar.module.css";

const SideBar = () => {
  return (
    <div className={classes["sidebar"]}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${classes["page-link"]} ${classes["active"]}`
                  : classes["page-link"]
              }
              to={"/"}
            >
              Movies
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${classes["page-link"]} ${classes["active"]}`
                  : classes["page-link"]
              }
              to={"/viewers"}
            >
              Viewers
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${classes["page-link"]} ${classes["active"]}`
                  : classes["page-link"]
              }
              to={"/cinemas"}
            >
              Cinemas
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${classes["page-link"]} ${classes["active"]}`
                  : classes["page-link"]
              }
              to={"/metadata"}
            >
              Metadata
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${classes["page-link"]} ${classes["active"]}`
                  : classes["page-link"]
              }
              to={"/analytics"}
            >
              Analytics
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
