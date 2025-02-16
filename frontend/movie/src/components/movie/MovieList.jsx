import React from "react";

const MovieList = (props) => {
  const FavComponent = props.favoritesComponent;
  return (
    <>
      {props.movies.map((movies, index) => (
        <div
          className="image-container d-flex justify-content-start m-3 position-relative"
          key={index}
        >
          <div className="movie-list">
            <img
              src={movies.Poster}
              alt="movie"
              className="rounded shadow-sm"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </div>
          <div
            className="overlay d-flex justify-content-center align-items-center position-absolute w-100 h-100"
            onClick={() => props.handleFavoritesClick(movies)}
            style={{
              background: "rgba(0,0,0,0.6)",
              opacity: 0,
              transition: "all 0.3s ease",
              cursor: "pointer",
              top: 0,
              left: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
          >
            <FavComponent />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
