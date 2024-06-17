import classes from "./MetadataFact.module.css";

const MetadataItem = ({ metadata }) => {
  return (
    <div className={classes["metadata-item"]} tabIndex={1}>
      <h3>{metadata.dw_table_name}</h3>
      <span>{metadata.fact_type}</span>
      <div className={classes["metadata-item-content"]}>
        <ul className={classes["column-list"]}>
          {metadata.dw_attribute_columns.map((column) => (
            <li className={classes["column-list-item"]}>
              <span>{column.dw_attribute_column_name}</span>
              <span>{column.dw_attribute_column_datatype}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MetadataItem;
