import React, { useState } from "react";
import style from "./selectStyle.module.css";

const SelectionFilter = ({ data, field, setData }) => {
  const entries = data;

  const uniqueValues = [...new Set(entries.map((entry) => entry[field]))];

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);

    const filteredData = value
      ? data.filter((entry) => entry[field] === value)
      : data;
    setData(filteredData);
    setCurrentPage(1);
  };

  return (
    <select
      name={field}
      className={style.filter}
      value={selectedValue}
      onChange={handleChange}
    >
      {uniqueValues.map((item, index) => (
        <option value={item} key={index}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default SelectionFilter;
