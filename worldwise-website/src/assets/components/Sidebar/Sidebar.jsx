import { Outlet } from "react-router-dom";

import Logo from "../../components/Logo/Logo";
import AppFooter from "../AppFooter/AppFooter";
import AppNav from "../AppNav/AppNav";

import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <AppFooter />
    </div>
  );
}

export default Sidebar;
