import { useState } from "react";

import classes from "./Select.module.css";

const Select = ({
  label,
  options,
  onChange = (value) => {},
  multiple = false,
  selectedOptions = [],
  onRemove = (value) => {},
  className = "",
}) => {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <div tabIndex={1} className={classes["select"] + " " + className}>
      {multiple ? (
        <label className={classes["selected-values"]}>
          {selectedOptions.length > 0
            ? options
                .filter((option) => selectedOptions.includes(option.value))
                .map((option) => (
                  <span
                    className={classes["selected-value"]}
                    onClick={() => onRemove(option.value)}
                  >
                    {option.label}
                  </span>
                ))
            : label}
        </label>
      ) : (
        <label className={classes["one-selected-value"]}>
          {selectedValue ?? label}
        </label>
      )}
      <div className={classes["select-dropdown"]}>
        <ul className={classes["select-dropdown-list"]}>
          {options.map((option) => (
            <li
              onClick={() => {
                onChange(option.value);
                setSelectedValue(option.label);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Select;
