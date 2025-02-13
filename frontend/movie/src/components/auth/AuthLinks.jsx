import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AuthLinks = () => {
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="d-flex align-items-center gap-2">
      {user ? (
        <>
          <span className="text-secondary me-2">{JSON.parse(user).email}</span>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="outline-primary" size="sm">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="sm">
              Register
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthLinks;
