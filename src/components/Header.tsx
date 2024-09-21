import { Link, Outlet } from "react-router-dom";
import styles from "@/app.module.css";

const Header = () => {
  return (
    <>
      <header className={styles.header_wrapper}>
        <div className={styles.header}>
          <Link to="/">
            <span className={styles.header_logo}>VIN Decoder</span>
          </Link>
          <nav
            className={styles.header_navigation}
            aria-label="Main Navigation"
          >
            <Link to="/" className={styles.header_navigation_link}>
              Main
            </Link>
            <Link to="/variables" className={styles.header_navigation_link}>
              Variables
            </Link>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
