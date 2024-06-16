import stringToColor from "../../../../utils/string-to-color";

import classes from "./ViewerListItem.module.css";

const ViewerListItem = ({ viewer }) => {
  return (
    <li className={classes["viewer"]}>
      <div
        className={classes["viewer-avatar"]}
        style={{ backgroundColor: stringToColor(viewer.name) }}
      >
        {viewer.name
          .split(" ")
          .map((word) => word[0])
          .join("")}
      </div>
      <div className={classes["viewer-content"]}>
        <h3 className={classes["viewer-name"]}>{viewer.name}</h3>
        <span>{viewer.phone_number}</span>
      </div>
    </li>
  );
};

export default ViewerListItem;
