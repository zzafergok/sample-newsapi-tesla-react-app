import React, { useContext, useState } from "react";
import { NewsContext } from "../contexts/NewsContext";
import "../assets/scss/search_bar.scss";

const SearchBar = () => {
  const { search, setSearch, getSearch, setError } = useContext(NewsContext);

  return (
    <div>
      <input
        className="search-bar"
        type="search"
        value={search}
        placeholder={search.length > 0 ? "" : "Please enter at least one word"}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && search.length !== 0) {
            getSearch(search);
            setSearch("");
            setError(false);
          } else {
            // setError(true);
            setTimeout(() => {
              setError(false);
            }, 7500);
          }
        }}
      />
      <button
        className={`search-button ${
          search.length > 0 ? "" : "search-button-word"
        } `}
        onClick={() => {
          if (search.length !== 0) {
            getSearch(search);
            setSearch("");
            setError(false);
          } else {
            setError(true);
            setTimeout(() => {
              setError(false);
            }, 7500);
          }
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
