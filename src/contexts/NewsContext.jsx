import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const { REACT_APP_API_KEY } = process.env;

export const NewsContext = createContext();

const NewsContextProvider = (props) => {
  const [tesla, setTesla] = useState();

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&language=en&apiKey=${REACT_APP_API_KEY}`
      )
      .then((res) => {
        console.log(res);
        setTesla(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <NewsContext.Provider value={{ tesla }}>
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsContextProvider;
