import MovieList from "../components/homepage/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import MovieListHeading from "../components/Heading/MovieListHeading";
import SearchBox from "../components/SearchBox";
import AddFavorites from "../components/AddFavorites";
import removeFavorites from "../components/removeFavorites";

function App() {
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

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("movies"));
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, []);

  const saveToStorage = (items) => {
    localStorage.setItem("movies", items);
  };

  const addToFavorites = (movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    saveToStorage(JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter(
      (fav) => fav.imdbID !== movie.imdbID
    );
    setFavorites(updatedFavorites);
    saveToStorage(newFavorites);
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
}

export default App;
