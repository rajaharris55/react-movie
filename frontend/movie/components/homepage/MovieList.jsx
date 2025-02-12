import React from "react";

const MovieList = (props) => {
  return (
    <>
      {props.movies.map((movies, index) => (
        <div>
          <img src={movies.Poster} alt="movie" />
        </div>
      ))}
    </>
  );
};

export default MovieList;
