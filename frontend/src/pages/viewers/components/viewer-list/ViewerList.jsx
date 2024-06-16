import ViewerListItem from "./ViewerListItem";

import classes from "./ViewerList.module.css";

const ViewerList = ({ viewers }) => {
  return (
    <ul className={classes["viewer-list"]}>
      {viewers.map((viewer) => (
        <ViewerListItem key={viewer.viewr_id} viewer={viewer} />
      ))}
    </ul>
  );
};

export default ViewerList;
