import React, { useState, useMemo, useCallback, useEffect } from "react";
import style from "./selectStyle.module.css";

const SelectionFilter = ({ data, setData, field, query }) => {
  // Memoize unique values to avoid unnecessary recalculations
  const uniqueValues = useMemo(() => {
    const values = [...new Set(data.map((item) => item[field]))];
    return values;
  }, [data, field]);

  // Keep the original data in a state
  const [originalData] = useState(data);
  const [selectedValue, setSelectedValue] = useState(query);

  // Memoize the handleChange function
  const handleChange = useCallback((e) => {
    setSelectedValue(e.target.value);
  }, []);

  useEffect(() => {
    // Filter data based on selected value
    const filteredData =
      selectedValue === query
        ? originalData
        : originalData.filter((item) => item[field] === selectedValue);

    // Update data with filtered data
    setData(filteredData);
  }, [selectedValue, field, setData, originalData]); // Include originalData

  return (
    <select
      name={field}
      className={style.filter}
      value={selectedValue}
      onChange={handleChange}
    >
      <option value={query}>{query}</option>
      {uniqueValues.map((item, index) => (
        <option value={item} key={index}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default SelectionFilter;
