import MovieList from "./components/movie/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import MovieListHeading from "./components/movie/MovieListHeading";
import SearchBox from "./components/search/SearchBox";
import AddFavorites from "./components/favorites/AddFavorites";
import RemoveFavorites from "./components/favorites/RemoveFavorites";
import axios from "axios";

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);

  const getMovieDetails = async (imdbID) => {
    const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=c87067e3`;
    const response = await fetch(url);
    const movie = await response.json();
    return movie;
  };

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=c87067e3`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      const moviesWithDetails = await Promise.all(
        responseJson.Search.map(async (movie) => {
          const details = await getMovieDetails(movie.imdbID);
          return {
            ...movie,
            Genre: details.Genre,
            imdbRating: details.imdbRating,
          };
        })
      );
      setMovies(moviesWithDetails);
    }
  };

  const API = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/movies/favorites",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error.response?.data || error);
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

  useEffect(() => {
    fetchFavorites();
  }, []);

  const addToFavorites = async (movie) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.post(
        "http://localhost:3000/api/movies/favorites",
        {
          imdbID: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      fetchFavorites(); // Refresh favorites list
    } catch (error) {
      console.error(
        "Error adding to favorites:",
        error.response?.data || error
      );
    }
  };

  const removeFromFavorites = async (movie) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.delete(
        `http://localhost:3000/api/movies/favorites/${movie.imdbID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      fetchFavorites(); // Refresh favorites list
    } catch (error) {
      console.error(
        "Error removing from favorites:",
        error.response?.data || error
      );
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
            favoritesComponent={RemoveFavorites}
            handleFavoritesClick={removeFromFavorites}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
