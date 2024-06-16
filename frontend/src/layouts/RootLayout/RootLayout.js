import { Outlet } from "react-router-dom";

import SideBar from "./components/SideBar";

import classes from "./RootLayout.module.css";

const RootLayout = () => {
  return (
    <div className={classes["root-layout"]}>
      <SideBar />
      <main className={classes["main-content"]}>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
