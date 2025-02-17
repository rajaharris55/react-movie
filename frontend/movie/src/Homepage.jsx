import MovieList from "./components/homepage/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import MovieListHeading from "./components/Heading/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorites from "./components/AddFavorites";
import removeFavorites from "./components/removeFavorites";
import axios from "axios";

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=c87067e3`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  const API = axios.create({
    baseURL: "http://localhost:3000",
    header: { "Content-Type": "application/json" },
  });

  const fetchFavorites = async () => {
    try {
      const response = await API.get("/movies/favorites");
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("movies");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error parsing saved favorites:", error);
        setFavorites([]);
      }
    }
  }, []);

  const addToFavorites = async (movie) => {
    try {
      await API.post("/api/movies/favorites", {
        imdbID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      });
      fetchFavorites();
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
    }
  };

  const removeFromFavorites = async (movie) => {
    try {
      await API.delete(`/api/movies/favorites/${movie.imdbID}`);
      fetchFavorites();
    } catch (error) {
      console.error("Error removing movie from favorites:", error);
    }
  };
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4 align-items-space-between">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div className="movie-container">
        <MovieList
          movies={movies}
          favoritesComponent={AddFavorites}
          handleFavoritesClick={addToFavorites}
        />
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4 align-items-space-between">
        <MovieListHeading heading="Favorites" />
        <div className="movie-container">
          <MovieList
            movies={favorites}
            favoritesComponent={removeFavorites}
            handleFavoritesClick={removeFromFavorites}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
