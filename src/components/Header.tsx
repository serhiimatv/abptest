import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header">
        <Link to="/">
          <span className="header__logo">VIN Decoder</span>
        </Link>
        <nav className="header__navigation">
          <Link to="/" className="header__navigation-link">
            Main
          </Link>
          <Link to="/variables" className="header__navigation-link">
            Variables
          </Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
