import React, { useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";
import Item from "../components/Item";
import "../assets/scss/item_list.scss";

function ListItem() {
  const { tesla } = useContext(NewsContext);
  return (
    <div className="container">
      <div className="row">
        {tesla.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ListItem;
