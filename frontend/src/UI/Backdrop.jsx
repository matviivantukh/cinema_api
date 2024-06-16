import classes from "./Backdrop.module.css";

const Backdrop = ({ onClose }) => {
  return <div onClick={onClose} className={classes["backdrop"]} />;
};

export default Backdrop;
