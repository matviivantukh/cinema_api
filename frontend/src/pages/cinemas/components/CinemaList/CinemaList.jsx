import CinemaListItem from "./CinemaListItem";

import classes from "./CinemaList.module.css";

const CinemaList = ({ cinemas }) => {
  return (
    <ul className={classes["cinema-list"]}>
      {cinemas.map((cinema) => (
        <CinemaListItem cinema={cinema} key={cinema.cinema_id} />
      ))}
    </ul>
  );
};

export default CinemaList;
