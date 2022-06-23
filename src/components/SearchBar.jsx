import React, { useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";
import "../assets/scss/search_bar.scss";

const SearchBar = () => {
  const { search, setSearch, getSearch } = useContext(NewsContext);
  return (
    <div>
      <input
        className="search-bar"
        type="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            getSearch(search);
            setSearch("");
          }
        }}
      />
      <button
        className="search-button"
        onClick={() => {
          console.log("1");
          getSearch(search);
          setSearch("");
          console.log("2");
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
