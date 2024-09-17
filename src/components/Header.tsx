import { Link, Outlet } from "react-router-dom";
import styles from "@/app.module.css";

const Header = () => {
  return (
    <>
      <div className={styles.header_wrapper}>
        <header className={styles.header}>
          <Link to="/">
            <span className={styles.header_logo}>VIN Decoder</span>
          </Link>
          <nav className={styles.header_navigation}>
            <Link to="/" className={styles.header_navigation_link}>
              Main
            </Link>
            <Link to="/variables" className={styles.header_navigation_link}>
              Variables
            </Link>
          </nav>
        </header>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
