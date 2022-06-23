import React, { useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";
import "../assets/scss/sort.scss";

const Sort = () => {
  const { handleSortChange, sort, allSort } = useContext(NewsContext);

  return (
    <div className="container select-sort">
      <div className="select-sort-multiple">
        <select
          className="select-sort-multiple-select"
          onChange={handleSortChange}
          value={sort}
        >
          {/* <option selected={true} disabled="disabled" value="Sorting" /> */}
          {allSort.map((item, index) => {
            return (
              <option
                key={index}
                value={item}
                // disabled={sort === item && "disabled"}
              >
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Sort;
