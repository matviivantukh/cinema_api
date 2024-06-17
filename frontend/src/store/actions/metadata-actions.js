import { metadataActions } from "../slices/metadata";

const getOltpMetadatas = () => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/metadata/oltp`);

    if (response.ok) {
      const responseData = await response.json();

      dispatch(metadataActions.getOltpMetadatas(responseData));
    }
  };
};

const getOlapMetadataFacts = () => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/metadata/olap/facts`);

    if (response.ok) {
      const responseData = await response.json();

      dispatch(metadataActions.getOlapMetadataFacts(responseData));
    }
  };
};

const getOlapMetadataDimensions = () => {
  return async (dispatch) => {
    const response = await fetch(
      `http://localhost:8080/metadata/olap/dimensions`
    );

    if (response.ok) {
      const responseData = await response.json();

      dispatch(metadataActions.getOlapMetadataDimensions(responseData));
    }
  };
};

const getDataLoadHistory = () => {
  return async (dispatch) => {
    const response = await fetch(
      `http://localhost:8080/metadata/data-load-history`
    );

    if (response.ok) {
      const responseData = await response.json();

      dispatch(metadataActions.getDataLoadHistory(responseData));
    }
  };
};

export {
  getOltpMetadatas,
  getOlapMetadataFacts,
  getOlapMetadataDimensions,
  getDataLoadHistory,
};
