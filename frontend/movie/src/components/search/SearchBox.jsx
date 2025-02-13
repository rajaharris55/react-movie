import React from "react";

const SearchBox = ({ searchValue, setSearchValue }) => {
  return (
    <div className="col col-sm-4 search-box">
      <input
        className="form-control form-control-lg shadow-sm"
        placeholder="Search for movies..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{
          borderRadius: "50px",
          padding: "10px 20px",
          border: "2px solid #e9ecef",
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#0d6efd")}
        onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
      />
    </div>
  );
};

export default SearchBox;
