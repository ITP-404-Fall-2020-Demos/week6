import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataStoreContext } from "./contexts";
import { logout } from "./auth";

export default function Navigation() {
  const { user, setUser } = useContext(DataStoreContext);

  async function logoutUser() {
    await logout();
    setUser(null);
  }

  return (
    <ul className="nav justify-content-end">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      {!user && (
        <li className="nav-item">
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>
        </li>
      )}
      {user ? (
        <li className="nav-item">
          <button
            type="button"
            className="btn btn-link nav-link"
            onClick={logoutUser}
          >
            Logout
          </button>
        </li>
      ) : (
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      )}
    </ul>
  );
}
