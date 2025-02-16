import React from "react";
import AuthLinks from "../auth/AuthLinks";

const MovieListHeading = (props) => {
  return (
    <div className="movie-title py-4 d-flex justify-content-between align-items-center">
      <div>
        <h1 className="fw-bold text-primary">{props.heading}</h1>
        <div className="border-bottom border-2 border-primary w-25 mb-3"></div>
      </div>
      <AuthLinks />
    </div>
  );
};

export default MovieListHeading;
