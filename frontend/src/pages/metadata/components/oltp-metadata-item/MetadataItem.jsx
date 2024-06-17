import classes from "./MetadataItem.module.css";

const MetadataItem = ({ metadata }) => {
  return (
    <div className={classes["metadata-item"]} tabIndex={1}>
      <h3>{metadata.source_table_name}</h3>
      <div className={classes["metadata-item-content"]}>
        <ul className={classes["column-list"]}>
          {metadata.source_columns.map((column) => (
            <li className={classes["column-list-item"]}>
              <span>{column.source_column_name}</span>
              <span>{column.data_type}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MetadataItem;
