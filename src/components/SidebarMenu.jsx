// Import Link from react router dom
import { Link, useNavigate } from "react-router-dom";

// Import hook react
import React, { useContext } from "react";

// Import Cookies from js-cookie
import Cookies from "js-cookie";

// Import context
import { AuthContext } from "../context/AuthContext";

// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function SidebarMenu() {
  // Using hook `useNavigate` for navigation
  const navigate = useNavigate();

  // Destructure context "setIsAuthenticated"
  const { setIsAuthenticated } = useContext(AuthContext);

  // Method to handle logout
  const logout = () => {
    // Remove token and user from cookies
    Cookies.remove("token");
    Cookies.remove("user");

    // Assign false to state "isAuthenticated"
    setIsAuthenticated(false);

    // Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <div className="card border-0 rounded shadow-sm">
      <div className="card-header">MAIN MENU</div>
      <div className="card-body">
        <div className="list-group">
          <Link
            to="/admin/dashboard"
            className="list-group-item list-group-item-action d-flex align-items-center"
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="list-group-item list-group-item-action d-flex align-items-center"
          >
            <FontAwesomeIcon icon={faUsers} className="me-2" />
            Users
          </Link>

          <a
            onClick={logout}
            className="list-group-item list-group-item-action d-flex align-items-center"
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
