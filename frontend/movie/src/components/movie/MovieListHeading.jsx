import React from "react";
import AuthLinks from "../auth/AuthLinks";

const MovieListHeading = (props) => {
  return (
    <div className="movie-title py-4 d-flex justify-content-between align-items-center">
      <div>
        <h1 className="fw-bold text-white">{props.heading}</h1>
      </div>
      <AuthLinks />
    </div>
  );
};

export default MovieListHeading;
