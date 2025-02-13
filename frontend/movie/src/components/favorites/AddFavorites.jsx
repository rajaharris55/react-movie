import React from "react";

const AddFavorites = (props) => {
  return (
    <div className="d-flex align-items-center text-white">
      <span className="me-2">Add to Favorites</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.2em"
        height="1.2em"
        fill="red"
        className="bi bi-heart-fill"
        viewBox="0 0 16 16"
        style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.5))" }}
      >
        <path
          fillRule="evenodd"
          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
        />
      </svg>
    </div>
  );
};

export default AddFavorites; 