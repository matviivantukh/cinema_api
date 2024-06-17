import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAnalytics } from "../../store/actions/analytic-actions";

import Select from "../../UI/Select";

import classes from "./Analytics.module.css";

const cubes = [
  {
    name: "order_fact",
    measurments: ["total_income_sum", "total_ticket_count", "avg_sum_of_order"],
    dimensions: ["gender_dim", "movie_dim", "cinema_dim"],
  },
  {
    name: "movie_license_contract_accrual_fact",
    measurments: ["difference_between_total_sum_and_minimum_sum"],
    dimensions: ["movie_license_contract_dim"],
  },
];

const dimensionToValueMap = {
  gender_dim: "gender_name",
  movie_dim: "name",
  cinema_dim: "cinema_name",
  movie_license_contract_dim: "contract_number",
};

const Analytics = () => {
  const [cube, setCube] = useState(null);
  const [selectedMeasurments, setSelectedMeasurments] = useState([]);
  const [selectedDimensions, setSelectedDimensions] = useState([]);
  const { analyticResults } = useSelector((state) => state.analytics);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleGetAnalytics = async () => {
    await dispatch(
      getAnalytics({
        cube: cube.name,
        measurments: selectedMeasurments,
        dimensions: selectedDimensions,
      })
    );
    setIsLoading(false);
  };

  useEffect(() => {
    setSelectedDimensions([]);
    setSelectedMeasurments([]);
  }, [cube]);

  useEffect(() => {
    if (selectedMeasurments.length != 0 && selectedDimensions.length != 0) {
      handleGetAnalytics();
    }
  }, [selectedDimensions, selectedMeasurments]);

  return (
    <div className={classes["analytics-page"]}>
      <form className={classes["analytics-form"]}>
        <div className={classes["form-section"]}>
          <h2>Cube</h2>
          <Select
            className={classes["select"]}
            label={"Select cube"}
            options={cubes.map((cube) => ({
              label: cube.name,
              value: cube.name,
            }))}
            onChange={(cube_name) =>
              setCube(cubes.find((cube) => cube.name === cube_name))
            }
          />
        </div>

        {cube && (
          <>
            {" "}
            <div className={classes["form-section"]}>
              <h2>Measurments</h2>
              <Select
                className={classes["select"]}
                label={"Select measurments"}
                options={cube.measurments.map((measurment) => ({
                  label: measurment,
                  value: measurment,
                }))}
                onChange={(measurment) => {
                  setIsLoading(true);
                  setSelectedMeasurments((prev) => {
                    if (prev.includes(measurment)) {
                      return prev.filter(
                        (prevMeasurment) => prevMeasurment !== measurment
                      );
                    }
                    return [...prev, measurment];
                  });
                }}
                selectedOptions={selectedMeasurments}
                multiple
                onRemove={(measurment) => {
                  setIsLoading(true);
                  setSelectedMeasurments((prev) =>
                    prev.filter(
                      (prevMeasurment) => prevMeasurment !== measurment
                    )
                  );
                }}
              />
            </div>
            <div className={classes["form-section"]}>
              <h2>Dimensions</h2>
              <Select
                className={classes["select"]}
                label={"Select dimensions"}
                options={cube.dimensions.map((dimension) => ({
                  label: dimension,
                  value: dimension,
                }))}
                onChange={(dimension) => {
                  setSelectedDimensions((prev) => {
                    setIsLoading(true);
                    if (prev.includes(dimension)) {
                      return prev.filter(
                        (prevdimension) => prevdimension !== dimension
                      );
                    }
                    return [...prev, dimension];
                  });
                }}
                selectedOptions={selectedDimensions}
                multiple
                onRemove={(dimension) => {
                  setIsLoading(true);
                  setSelectedDimensions((prev) =>
                    prev.filter((prevdimension) => prevdimension !== dimension)
                  );
                }}
              />
            </div>
          </>
        )}
      </form>

      <table className={classes["analytics-table"]}>
        <thead>
          <tr>
            {selectedMeasurments.map((measurment) => (
              <th>{measurment}</th>
            ))}
            {selectedDimensions.map((dimension) => (
              <th>{dimension}</th>
            ))}
          </tr>
        </thead>
        {!isLoading && (
          <tbody>
            {analyticResults.map((row) => (
              <tr>
                {selectedMeasurments.map((measurment) => (
                  <th>{row[measurment]}</th>
                ))}
                {selectedDimensions.map((dimension) => (
                  <th>{row[dimension][dimensionToValueMap[dimension]]}</th>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Analytics;
