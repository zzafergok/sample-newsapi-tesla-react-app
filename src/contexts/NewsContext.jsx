import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const {
  REACT_APP_API_KEY_FIRST,
  REACT_APP_API_KEY_SECOND,
  REACT_APP_API_KEY_THIRD,
} = process.env;

export const NewsContext = createContext();

const NewsContextProvider = (props) => {
  const [tesla, setTesla] = useState([]);
  const [detail, setDetail] = useState({});
  const [category, setCategory] = useState("tesla");
  const [sort, setSort] = useState("relevancy");

  const allCategory = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const allSort = ["publishedAt", "popularity", "relevancy"];

  useEffect(() => {
    getNews(category, sort);
    console.log("sort", sort);
  }, [sort, category]);

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
  }, []);

  async function getNews(item, sortItem) {
    if (window.location.pathname == "/") {
      await axios
        .get(
          `https://newsapi.org/v2/everything?q=tesla&sortBy=${sortItem}&apiKey=${REACT_APP_API_KEY_THIRD}`
        )
        .then((res) => {
          setTesla(res.data.articles);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (window.location.pathname == `/${item}`) {
      await axios
        .get(
          `https://newsapi.org/v2/top-headlines?category=${item}&sortBy=${sortItem}&language=en&apiKey=${REACT_APP_API_KEY_THIRD}`
        )
        .then((res) => {
          setTesla(res.data.articles);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleClick = (item, url) => {
    let splitUrl = item.title.toLowerCase();
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
          isRead: true,
        };
        localStorage.setItem("detail", JSON.stringify(newDetail));
      }
      window.location.href = `/${url}`;
    });

    setRead(
      seen.filter(function (elem, pos) {
        return seen.indexOf(elem) == pos;
      })
    );
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async function handleSortChange(e) {
    localStorage.setItem("sort", JSON.stringify(e.target.value));
    window.location.href =
      await `${window.location.pathname}?sortBy=${e.target.value}`;
  }

  return (
    <NewsContext.Provider
      value={{
        tesla,
        detail,
        handleClick,
        setCategory,
        capitalizeFirstLetter,
        handleSortChange,
        sort,
        allCategory,
        allSort,
      }}
    >
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsContextProvider;
