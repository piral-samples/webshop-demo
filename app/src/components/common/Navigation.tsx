import * as React from "react";
import * as ROUTE from "../../constants/routes";
import { FilterOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../images/logo-full.png";
import UserAvatar from "../../views/account/components/UserAvatar";
import BasketToggle from "../basket/BasketToggle";
import Badge from "./Badge";
import FiltersToggle from "./FiltersToggle";
import MobileNavigation from "./MobileNavigation";
import SearchBar from "./SearchBar";

const Navigation = () => {
  const navbar = React.useRef(null);
  const { pathname } = useLocation();

  const store = useSelector((state) => ({
    basketLength: state.basket.length,
    user: state.auth,
    isAuthenticating: state.app.isAuthenticating,
    isLoading: state.app.loading,
  }));

  const scrollHandler = () => {
    if (navbar.current && window.screen.width > 480) {
      if (window.pageYOffset >= 70) {
        navbar.current.classList.add("is-nav-scrolled");
      } else {
        navbar.current.classList.remove("is-nav-scrolled");
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const onClickLink = (e) => {
    if (store.isAuthenticating) e.preventDefault();
  };

  // disable the basket toggle to these pathnames
  const basketDisabledpathnames = [
    ROUTE.checkoutStep1,
    ROUTE.checkoutStep2,
    ROUTE.checkoutStep3,
    ROUTE.signin,
    ROUTE.signup,
    ROUTE.forgotPassword,
  ];

  if (store.user && store.user.role === "ADMIN") {
    return null;
  }
  if (window.screen.width <= 800) {
    return (
      <MobileNavigation
        {...store}
        disabledPaths={basketDisabledpathnames}
        pathname={pathname}
      />
    );
  }
  return (
    <nav className="navigation" ref={navbar}>
      <div className="logo">
        <Link onClick={onClickLink} to="/">
          <img alt="Logo" src={logo} />
        </Link>
      </div>
      <ul className="navigation-menu-main">
        <li>
          <NavLink
            activeClassName="navigation-menu-active"
            exact
            to={ROUTE.home}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="navigation-menu-active" to={ROUTE.shop}>
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="navigation-menu-active"
            to={ROUTE.featuredProducts}
          >
            Featured
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="navigation-menu-active"
            to={ROUTE.recommendedProducts}
          >
            Recommended
          </NavLink>
        </li>
      </ul>
      {(pathname === ROUTE.shop || pathname === ROUTE.search) && (
        <FiltersToggle>
          <button className="button-muted button-small" type="button">
            Filters &nbsp;
            <FilterOutlined />
          </button>
        </FiltersToggle>
      )}
      <SearchBar />
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <BasketToggle>
            {({ onClickToggle }) => (
              <button
                className="button-link navigation-menu-link basket-toggle"
                disabled={basketDisabledpathnames.includes(pathname)}
                onClick={onClickToggle}
                type="button"
              >
                <Badge count={store.basketLength}>
                  <ShoppingOutlined style={{ fontSize: "2.4rem" }} />
                </Badge>
              </button>
            )}
          </BasketToggle>
        </li>
        {store.user ? (
          <li className="navigation-menu-item">
            <UserAvatar />
          </li>
        ) : (
          <li className="navigation-action">
            {pathname !== ROUTE.signup && (
              <Link
                className="button button-small"
                onClick={onClickLink}
                to={ROUTE.signup}
              >
                Sign Up
              </Link>
            )}
            {pathname !== ROUTE.signin && (
              <Link
                className="button button-small button-muted margin-left-s"
                onClick={onClickLink}
                to={ROUTE.signin}
              >
                Sign In
              </Link>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
