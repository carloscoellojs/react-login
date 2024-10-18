import { NavLink, Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logUserOutAction } from "../../actions/userActions";
import { Button } from "../Button/Button";

// component for our main navigation
const Navigation = () => {
  const { isAuthenticated } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const AUTHENTICATED_NAV_LINKS = [
    ["Dashboard", { to: "/dashboard" }],
    ["Blog", { to: "/blog" }],
    ["Logout", { onClick: () => dispatch(logUserOutAction()), to: "/" }]
  ];

  const UN_AUTHENTICATED_NAV_LINKS = [
    ["Login", { to: "/" }],
    ["Register", { to: "/register" }]
  ];

  const createNavLinks = (linkMapping) =>
    linkMapping.map((link) => (
      <li key={link[0]} className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          {...link[1]}
        >
          {link[0]}
        </NavLink>
      </li>
    ));

  // show or hide links if isAuthenticated true or false
  const authenticatedLinks = () =>
    isAuthenticated ? (
      <div
        className="navbar-nav d-flex justify-content-end"
        style={{ minWidth: "100%" }}
      >
        {createNavLinks(AUTHENTICATED_NAV_LINKS)}
      </div>
    ) : (
      <div
        className="navbar-nav d-flex justify-content-end"
        style={{ minWidth: "100%" }}
      >
        {createNavLinks(UN_AUTHENTICATED_NAV_LINKS)}
      </div>
    );

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <NavLink className="nav-link text-light" to="/">
          Ecommerce
        </NavLink>
        <Button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </Button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {authenticatedLinks()}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
