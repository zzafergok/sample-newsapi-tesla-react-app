import React, { useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";
import Item from "../components/Item";
import "../assets/scss/item_list.scss";

function ListItem() {
  const { tesla, searchArray, searched } = useContext(NewsContext);
  return (
    <div className="container container-list-item">
      {searched && (
        <div className="row searched">
          <div className="col-9 col-sm-9 col-md-10 searched-group">
            <h3>Searched:</h3>
            <button
              className="searched-group-button"
              onClick={() => {
                return (window.location.href = `/`);
              }}
            >
              {searched.toUpperCase()}
            </button>
          </div>
        </div>
      )}
      <div className="row">
        {searchArray.length > 0
          ? searchArray.map((item, index) => {
              return <Item key={index} item={item} />;
            })
          : tesla.map((item, index) => {
              return <Item key={index} item={item} />;
            })}
      </div>
    </div>
  );
}

export default ListItem;
