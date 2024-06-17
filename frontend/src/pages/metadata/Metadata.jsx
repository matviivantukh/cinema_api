import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getHours, getMinutes } from "date-fns";

import {
  getOltpMetadatas,
  getOlapMetadataFacts,
  getOlapMetadataDimensions,
  getDataLoadHistory,
} from "../../store/actions/metadata-actions";

import MetadataItem from "./components/oltp-metadata-item/MetadataItem";
import MetadataFact from "./components/olap-metdata-item/MetadataFact";
import MetadataDimension from "./components/olap-metdata-item/MetadataDimension";

import classes from "./Metadata.module.css";

const Metadata = () => {
  const {
    oltpMetadatas,
    olapMetadataFacts,
    olapMetadataDimensions,
    dataLoadHistory,
  } = useSelector((state) => state.metadatas);
  const dispatch = useDispatch();
  const [isPrimaryFillLoading, setIsPrimaryFillLoading] = useState(false);
  const [isIncrementalFillLoading, setIsIncrementalFillLoading] =
    useState(false);

  useEffect(() => {
    dispatch(getOltpMetadatas());
    dispatch(getOlapMetadataFacts());
    dispatch(getOlapMetadataDimensions());
    dispatch(getDataLoadHistory());
  }, []);

  const handlePrimaryFill = async () => {
    setIsPrimaryFillLoading(true);
    await fetch("http://localhost:8080/metadata/primary-fill", {
      method: "POST",
    });
    setIsPrimaryFillLoading(false);
    dispatch(getDataLoadHistory());
  };

  const handleIncrementalFill = async () => {
    setIsIncrementalFillLoading(true);
    await fetch("http://localhost:8080/metadata/incremental-fill", {
      method: "POST",
    });
    setIsIncrementalFillLoading(false);
    dispatch(getDataLoadHistory());
  };

  return (
    <div className={classes["metadata-container"]}>
      <div className={classes["data-load-history"]}>
        <div className={classes["data-load-history-title"]}>
          <h2>Data Load History</h2>
          <div className={classes["data-load-history-controls"]}>
            <button onClick={handlePrimaryFill} disabled={isPrimaryFillLoading}>
              Primary Fill
            </button>
            <button
              onClick={handleIncrementalFill}
              disabled={isIncrementalFillLoading}
            >
              Incremental Fill
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Datetime</th>
              <th>Load time</th>
              <th>Load rows</th>
              <th>Affected table count</th>
              <th>Source table count</th>
            </tr>
          </thead>
          <tbody>
            {dataLoadHistory.map((row) => (
              <tr>
                <td>
                  {new Date(row.load_datetime).toISOString().slice(0, 10)}{" "}
                  {getHours(new Date(row.load_datetime))}:
                  {getMinutes(new Date(row.load_datetime))}
                </td>
                <td>{row.load_time}</td>
                <td>{row.load_rows}</td>
                <td>{row.affected_table_count}</td>
                <td>{row.source_table_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={classes["tables-metadata"]}>
        <div className={classes["oltp-metadata"]}>
          <h2>OLTP tables</h2>
          <ul className={classes["metadata-list"]}>
            {oltpMetadatas.map((metadata) => (
              <MetadataItem metadata={metadata} />
            ))}
          </ul>
        </div>
        <div className={classes["olap-metadata"]}>
          <h2>OLAP facts and dimensions</h2>
          <ul className={classes["metadata-list"]}>
            {olapMetadataFacts.map((metadata) => (
              <MetadataFact metadata={metadata} />
            ))}
            {olapMetadataDimensions.map((metadata) => (
              <MetadataDimension metadata={metadata} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Metadata;
