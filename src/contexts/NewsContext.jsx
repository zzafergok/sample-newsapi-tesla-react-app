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
          console.log(res.data.articles);
          setTesla(res.data.articles);
        })
        .catch((err) => {
          console.log(err);
        });
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
          title: element.title,
          content: element.content,
          image: element.urlToImage,
          author: element.author,
          date: element.publishedAt,
          seen: true,
        };
        setDetail(newDetail);
      }
      // window.location.href = `/${url}`;
    });
  };

  return (
    <NewsContext.Provider value={{ tesla, detail, setDetail, handleClick }}>
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsContextProvider;
