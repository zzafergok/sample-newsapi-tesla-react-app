import React, { useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";
import Item from "../components/Item";
import "../assets/scss/item_list.scss";

function ListItem() {
  const { tesla } = useContext(NewsContext);

  return (
    <div className="container container-list-item">
      <div className="row">
        {tesla.map((item, index) => {
          item.isRead = false;
          return <Item key={index} item={item} />;
        })}
      </div>
    </div>
  );
}

export default ListItem;
