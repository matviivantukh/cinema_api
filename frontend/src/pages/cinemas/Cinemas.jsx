import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllCinemas } from "../../store/actions/cinema-actions";

import CinemaList from "./components/CinemaList/CinemaList";

import classes from "./Cinemas.module.css";

const Cinemas = () => {
  const { cinemas } = useSelector((state) => state.cinemas);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCinemas());
  }, [dispatch]);

  return (
    <div className={classes["cinema-page"]}>
      <CinemaList cinemas={cinemas} />
    </div>
  );
};

export default Cinemas;
