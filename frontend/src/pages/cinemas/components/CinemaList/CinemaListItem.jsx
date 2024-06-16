import { Link } from "react-router-dom";

import classes from "./CinemaListItem.module.css";

import cinemaImage from "../../../../images/cinema.png";

const CinemaListItem = ({ cinema }) => {
  return (
    <li className={classes["cinema"]}>
      <Link to={`${cinema.cinema_id}`}>
        <img
          className={classes["cinema-image"]}
          src={cinemaImage}
          alt="cinema"
        />
        <div className={classes["cinema-content"]}>
          <h3 className={classes["cinema-title"]}>{cinema.cinema_name}</h3>
          <span className={classes["cinema-location"]}>
            <span>{cinema.city.city_name}</span>
            <span>{cinema.city.country.country_name}</span>
          </span>
          <span>{cinema.detailed_address}</span>
        </div>
      </Link>
    </li>
  );
};

export default CinemaListItem;
