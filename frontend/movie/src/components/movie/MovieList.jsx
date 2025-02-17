import React from "react";

const MovieList = (props) => {
  const FavComponent = props.favoritesComponent;
  return (
    <>
      {props.movies.map((movie, index) => (
        <div
          className="image-container d-flex justify-content-start m-3 position-relative"
          key={index}
        >
          <div className="movie-list position-relative">
            <img
              src={movie.Poster || movie.poster}
              alt={movie.Title || movie.title}
              className="rounded shadow-sm"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
            <div
              className="overlay d-flex flex-column justify-content-between p-3 position-absolute w-100 h-100"
              style={{
                background: "rgba(0,0,0,0.8)",
                opacity: 0,
                transition: "all 0.3s ease",
                cursor: "pointer",
                top: 0,
                left: 0,
                borderRadius: "0.25rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
            >
              <div>
                <h5 className="text-white mb-2">{movie.Title || movie.title}</h5>
                <p className="text-white-50 mb-1">Year: {movie.Year || movie.year}</p>
                {movie.Genre && (
                  <p className="text-white-50 mb-1">Genre: {movie.Genre}</p>
                )}
                {movie.imdbRating && (
                  <p className="text-white-50 mb-1">Rating: {movie.imdbRating}/10</p>
                )}
              </div>
              <div 
                className="d-flex justify-content-center w-100"
                onClick={() => props.handleFavoritesClick(movie)}
              >
                <FavComponent />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
