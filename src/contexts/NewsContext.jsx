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
        `https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&language=en&apiKey=${REACT_APP_API_KEY_FOURTH}`
      );
      setTeslaLoading(true);
      localStorage.setItem("tesla", JSON.stringify(url.data.articles));
      setTeslaLoading(false);
    } else if (window.location.pathname == `/${item}`) {
      const url = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${item}&sortBy=publishedAt&pageSize=100&language=en&apiKey=${REACT_APP_API_KEY_FOURTH}`
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
    const url = `https://newsapi.org/v2/everything?q=${item}&sortBy=publishedAt&language=en&apiKey=${REACT_APP_API_KEY_FOURTH}`;
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

  //go to detail page
  const handleClick = (item, url) => {
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

        //seen
        if (element.description === item.description) {
          let newDetail = {
            author: item.author,
            content: item.content,
            description: item.description,
            publishedAt: item.publishedAt,
            title: item.title,
            url: item.url,
            urlToImage: item.urlToImage,
            isSeen: true,
          };

          const newArr = [...teslaItem, newDetail];

          const uniqueIds = [];

          const uniqueTeslaItem = newArr.filter((element) => {
            const isDuplicate = uniqueIds.includes(element.title);

            if (!isDuplicate) {
              uniqueIds.push(element.title);
              return true;
            }
            return false;
          });

          localStorage.setItem("teslaItem", JSON.stringify(uniqueTeslaItem));
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

  return (
    <NewsContext.Provider
      value={{
        tesla,
        teslaItem,
        detail,
        searchDetail,
        handleClick,
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
