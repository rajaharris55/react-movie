import React from "react";

const MovieList = (props) => {
  const FavComponent = props.favoritesComponent;
  return (
    <>
      {props.movies.map((movies, index) => (
        <div className="image-container d-flex justify-content-start m-3" key={index}>
          <div className="movie-list">
            <img src={movies.Poster} alt="movie" />
          </div>
          <div
            className="overlay d-flex justify-content-center align-items-center"
            onClick={() => props.handleFavoritesClick(movies)}
          >
            <FavComponent />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList; 