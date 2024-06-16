import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getAllDistributors } from "../../../../store/actions/distributor-actions";
import { getAllScreeningFormats } from "../../../../store/actions/screening-format-actions";
import { getAllLanguages } from "../../../../store/actions/language-actions";
import { createMovieLicense } from "../../../../store/actions/movie-license-contract-actions";

import Select from "../../../../UI/Select";

import classes from "./MovieLicenseContractCreateModal.module.css";

const MovieLicenseContractCreateModal = ({ onClose }) => {
  const { distributors } = useSelector((store) => store.distributors);
  const { screeningFormats } = useSelector((store) => store.screeningFormats);
  const { languages } = useSelector((store) => store.languages);
  const [selectedDistributorId, setSelectedDistributorId] = useState(null);
  const [selectedScreeningFormatIds, setSelectedScreeningFormatIds] = useState(
    []
  );
  const [selectedLanguageId, setSelectedLanguageId] = useState(null);
  const [percentageOfSales, setPercentageOfSales] = useState(0);
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [startOfScreeningDate, setStartOfScreeningDate] = useState(new Date());
  const [endOfScreeningDate, setEndOfScreeningDate] = useState(new Date());
  const { movieId } = useParams();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      createMovieLicense({
        movieId,
        languageId: selectedLanguageId,
        distributorId: selectedDistributorId,
        screeningFormatIds: selectedScreeningFormatIds,
        percentageOfSales,
        minimumPrice,
        startOfScreeningDate: startOfScreeningDate.toISOString().slice(0, 10),
        endOfScreeningDate: endOfScreeningDate.toISOString().slice(0, 10),
      })
    );
    onClose();
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDistributors());
    dispatch(getAllScreeningFormats());
    dispatch(getAllLanguages());
  }, []);

  return (
    <div className={classes["movie-create-modal"]}>
      <form
        className={classes["movie-create-form"]}
        onSubmit={handleFormSubmit}
      >
        <h2>Create License</h2>
        <input
          placeholder="Enter percentage of sales"
          className={classes["input"]}
          type="number"
          onChange={(e) => setPercentageOfSales(e.target.value)}
          value={percentageOfSales}
        />
        <input
          placeholder="Enter minimum price"
          className={classes["input"]}
          type="number"
          onChange={(e) => setMinimumPrice(e.target.value)}
          value={minimumPrice}
        ></input>
        <label>
          <span>Start of screening date</span>
          <input
            className={classes["input"]}
            type="date"
            onChange={(e) => setStartOfScreeningDate(new Date(e.target.value))}
            value={startOfScreeningDate.toISOString().slice(0, 10)}
          />
        </label>
        <label>
          <span>End of screening date</span>
          <input
            className={classes["input"]}
            type="date"
            onChange={(e) => setEndOfScreeningDate(new Date(e.target.value))}
            value={endOfScreeningDate.toISOString().slice(0, 10)}
          />
        </label>
        <div className={classes["movie-create-modal-selects"]}>
          <Select
            className={classes["select"]}
            label={"Select distributor"}
            options={distributors.map((distributor) => ({
              label: distributor.distributor_name,
              value: distributor.distributor_id,
            }))}
            onChange={(distributorId) => {
              setSelectedDistributorId(distributorId);
            }}
          />
          <Select
            className={classes["select"]}
            label={"Select language"}
            options={languages.map((language) => ({
              label: language.language_name,
              value: language.language_id,
            }))}
            onChange={(languageId) => {
              setSelectedLanguageId(languageId);
            }}
          />
          <Select
            className={classes["select"]}
            label={"Select screening formats"}
            options={screeningFormats.map((screeningFormat) => ({
              label: screeningFormat.screening_format,
              value: screeningFormat.screening_format_id,
            }))}
            onChange={(screeningFormatId) => {
              setSelectedScreeningFormatIds((prev) => {
                if (prev.includes(screeningFormatId)) {
                  return prev.filter((id) => id !== screeningFormatId);
                }
                return [...prev, screeningFormatId];
              });
            }}
            selectedOptions={selectedScreeningFormatIds}
            multiple
            onRemove={(screeningFormatId) =>
              setSelectedScreeningFormatIds((prev) =>
                prev.filter((id) => id !== screeningFormatId)
              )
            }
          />
        </div>
        <div className={classes["actions"]}>
          <button className={classes["button"]} onClick={onClose}>
            Close
          </button>
          <button type="submit" className={classes["button"]}>
            Create License
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieLicenseContractCreateModal;
