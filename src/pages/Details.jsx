import React, { useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";

const Details = () => {
  const { tesla } = useContext(NewsContext);

  return <div>Details</div>;
};

export default Details;
