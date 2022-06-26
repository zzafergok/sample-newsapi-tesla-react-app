import React, { useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";
import { IoWarningOutline } from "react-icons/io5";
import "../assets/scss/error.scss";

const Error = () => {
  const { error, setError } = useContext(NewsContext);

  return (
    <div className="searched">
      {error && (
        <div
          className="col-3 col-sm-4 col-md-2  searched-error"
          onClick={() => {
            return setError(false);
          }}
        >
          <IoWarningOutline />
          <p>Please enter at least one word</p>
        </div>
      )}
    </div>
  );
};

export default Error;
