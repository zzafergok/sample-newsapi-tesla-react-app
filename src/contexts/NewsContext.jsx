import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

// api keys
const {
  REACT_APP_API_KEY_FIRST,
  REACT_APP_API_KEY_SECOND,
  REACT_APP_API_KEY_THIRD,
  REACT_APP_API_KEY_FOURTH,
} = process.env;

export const NewsContext = createContext();

const NewsContextProvider = (props) => {
  //tesla
  const [tesla, setTesla] = useState([]);
  const [teslaItem, setTeslaItem] = useState([]);
  //detail
  const [detail, setDetail] = useState({});
  //category
  const [category, setCategory] = useState("tesla");
  //loading
  const [loading, setLoading] = useState(false);
  const [teslaLoading, setTeslaLoading] = useState(false);
  //search
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState("");
  const [searchDetail, setSearchDetail] = useState({});
  const [searchArray, setSearchArray] = useState([]);
  //error
  const [error, setError] = useState(false);

  const allCategory = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  useEffect(() => {
    getNews(category);
  }, [category, teslaLoading]);

  // set local storage
  useEffect(() => {
    const getDetail = JSON.parse(localStorage.getItem("detail"));
    if (getDetail) {
      setDetail(getDetail);
    }

    const getCateg = JSON.parse(localStorage.getItem("category"));
    if (getCateg) {
      setCategory(getCateg);
    }

    const getSearchDetail = JSON.parse(localStorage.getItem("searchDetail"));
    if (getSearchDetail) {
      setSearchDetail(getSearchDetail);
    }

    const getTesla = JSON.parse(localStorage.getItem("tesla"));
    if (getTesla) {
      setTesla(getTesla);
    }

    const getTeslaItem = JSON.parse(localStorage.getItem("teslaItem"));
    if (getTeslaItem) {
      setTeslaItem(getTeslaItem);
    }
  }, []);

  // get newsapi request
  async function getNews(item) {
    if (window.location.pathname == "/") {
      const url = await axios.get(
        `https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&language=en&apiKey=${REACT_APP_API_KEY_FIRST}`
      );
      setTeslaLoading(true);
      localStorage.setItem("tesla", JSON.stringify(url.data.articles));
      setTeslaLoading(false);
    } else if (window.location.pathname == `/${item}`) {
      const url = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${item}&sortBy=publishedAt&pageSize=100&language=en&apiKey=${REACT_APP_API_KEY_FIRST}`
      );
      setTeslaLoading(true);
      setSearched(item);
      setTesla(url.data.articles);
      setTeslaLoading(false);
    }
  }

  // get search news
  const getSearch = async (item) => {
    setLoading(true);
    const url = `https://newsapi.org/v2/everything?q=${item}&sortBy=publishedAt&language=en&apiKey=${REACT_APP_API_KEY_FIRST}`;
    const data = await axios.get(url);
    if (data.data.articles.length > 0) {
      setSearchArray(data.data.articles);
      setLoading(false);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 7500);
    }
  };

  return (
    <NewsContext.Provider
      value={{
        tesla,
        teslaItem,
        detail,
        searchDetail,
        setCategory,
        allCategory,
        loading,
        teslaLoading,
        search,
        setSearch,
        searchArray,
        getSearch,
        error,
        setError,
        searched,
      }}
    >
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsContextProvider;
