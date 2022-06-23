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
  //detail
  const [detail, setDetail] = useState({});
  const [searchDetail, setSearchDetail] = useState({});
  //category
  const [category, setCategory] = useState("tesla");
  //loading
  const [loading, setLoading] = useState(false);
  const [teslaLoading, setTeslaLoading] = useState(false);
  //search
  const [search, setSearch] = useState("");
  const [searchArray, setSearchArray] = useState([]);

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

    const getSort = JSON.parse(localStorage.getItem("sort"));
    if (getSort) {
      setSort(getSort);
    }

    const getSearchDetail = JSON.parse(localStorage.getItem("searchDetail"));
    if (getSearchDetail) {
      setSearchDetail(getSearchDetail);
    }
  }, []);

  // get newsapi request
  async function getNews(item, sortItem) {
    if (window.location.pathname == "/") {
      await axios
        .get(
          `https://newsapi.org/v2/everything?q=tesla&apiKey=${REACT_APP_API_KEY_SECOND}`
        )
        .then((res) => {
          setTeslaLoading(true);
          console.log(res);
          setTesla(res.data.articles);
          setTeslaLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (window.location.pathname == `/${item}`) {
      await axios
        .get(
          `https://newsapi.org/v2/top-headlines?category=${item}&pageSize=100&language=en&apiKey=${REACT_APP_API_KEY_SECOND}`
        )
        .then((res) => {
          setTeslaLoading(true);
          setTesla(res.data.articles);
          setTeslaLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // get search news
  const getSearch = async (item) => {
    setLoading(true);
    const url = `https://newsapi.org/v2/everything?q=${item}&apiKey=${REACT_APP_API_KEY_SECOND}`;
    const data = await axios.get(url);
    console.log("data.data.articles", data.data.articles);
    setSearchArray(data.data.articles);
    setLoading(false);
  };

  //go to detail page
  const handleClick = (item, url) => {
    let splitUrl = item.title.toLowerCase();
    tesla.length > 0 &&
      tesla.filter((element) => {
        let elementSplitUrl = element.title.toLowerCase();
        elementSplitUrl = elementSplitUrl.replace(
          /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
          ""
        );
        let elementNewUrl = elementSplitUrl.replace(/\s/g, "-");

        if (elementNewUrl === url) {
          let newDetail = {
            idTitle: elementNewUrl,
            title: element.title,
            content: element.content,
            image: element.urlToImage,
            author: element.author,
            date: element.publishedAt.slice(0, -10),
            time: element.publishedAt.slice(11, -1),
            isRead: true,
          };
          localStorage.setItem("detail", JSON.stringify(newDetail));
        }
        window.location.href = `/${url}`;
      });

    searchArray.length > 0 &&
      searchArray?.filter((element) => {
        let elementSplitUrl = element.title.toLowerCase();
        elementSplitUrl = elementSplitUrl.replace(
          /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
          ""
        );
        let elementNewUrl = elementSplitUrl.replace(/\s/g, "-");

        if (elementNewUrl === url) {
          let newDetail = {
            idTitle: elementNewUrl,
            title: element.title,
            content: element.content,
            image: element.urlToImage,
            author: element.author,
            date: element.publishedAt.slice(0, -10),
            time: element.publishedAt.slice(11, -1),
            isRead: true,
          };
          localStorage.setItem("searchDetail", JSON.stringify(newDetail));
        }
        window.location.href = `/${url}`;
      });
  };

  // text first character to uppercase
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <NewsContext.Provider
      value={{
        tesla,
        detail,
        searchDetail,
        handleClick,
        setCategory,
        capitalizeFirstLetter,
        allCategory,
        loading,
        teslaLoading,
        search,
        setSearch,
        searchArray,
        getSearch,
      }}
    >
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsContextProvider;
