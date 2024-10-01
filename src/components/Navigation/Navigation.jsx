import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logUserOutAction } from "../../actions/userActions";

// component for our main navigation
const Navigation = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // show or hide links if isAuthenticated true or false
  const authenticatedLinks = isAuthenticated && (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/blog">
          Blog
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          onClick={() => dispatch(logUserOutAction())}
          to="/"
        >
          Logout
        </Link>
      </li>
    </ul>
  );
  const guestLinks = !isAuthenticated && (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">
          Login <span className="sr-only">(current)</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        Ecommerce
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
        {authenticatedLinks}
        {guestLinks}
      </div>
    </nav>
  );
};

export default Navigation;
