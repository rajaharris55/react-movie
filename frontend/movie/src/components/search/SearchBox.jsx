import React from "react";

const SearchBox = ({ searchValue, setSearchValue }) => {
  return (
    <div className="col col-sm-4 search-box">
      <input
        className="form-control"
        placeholder="Enter a movie name..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
    </div>
  );
};

export default SearchBox; 