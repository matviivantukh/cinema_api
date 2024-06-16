import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./ViewersFilter.module.css";

const ViewersFilter = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  useEffect(() => {
    navigate(
      `/viewers/?${debouncedSearch != "" ? "search=" + debouncedSearch : ""}`
    );
  }, [debouncedSearch]);

  return (
    <div className={classes["filters"]}>
      <input
        placeholder="Enter name of the viewer"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className={classes["search-bar"]}
      />
    </div>
  );
};

export default ViewersFilter;
