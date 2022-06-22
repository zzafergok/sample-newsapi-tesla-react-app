import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const { REACT_APP_API_KEY } = process.env;

export const NewsContext = createContext();

const NewsContextProvider = (props) => {
  const [tesla, setTesla] = useState([]);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    if (window.location.pathname == "/") {
      axios
        .get(
          `https://newsapi.org/v2/everything?q=tesla&apiKey=${REACT_APP_API_KEY}`
        )
        .then((res) => {
          setTesla(res.data.articles);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    const getDetail = JSON.parse(localStorage.getItem("detail"));
    if (getDetail) {
      setDetail(getDetail);
    }
  }, []);

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

  return (
    <NewsContext.Provider value={{ tesla, detail, handleClick }}>
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsContextProvider;
