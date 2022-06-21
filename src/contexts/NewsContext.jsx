import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const { REACT_APP_API_KEY } = process.env;

export const NewsContext = createContext();

const NewsContextProvider = (props) => {
  const [tesla, setTesla] = useState();

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
  return (
    <NewsContext.Provider value={{ tesla }}>
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsContextProvider;
