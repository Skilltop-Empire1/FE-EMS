import React, { useState, useMemo, useCallback, useEffect } from "react";
import style from "./selectStyle.module.css";

const SelectionFilter = ({ data, setData, field, query }) => {
  const uniqueValues = useMemo(() => {
    const values = [...new Set(data.map((item) => item[field]))];
    return values;
  }, [data, field]);

  const [originalData] = useState(data);
  const [selectedValue, setSelectedValue] = useState(query);

  const handleChange = useCallback((e) => {
    setSelectedValue(e.target.value);
  }, []);

  useEffect(() => {
    const filteredData =
      selectedValue === query
        ? originalData
        : originalData.filter((item) => item[field] === selectedValue);

    setData(filteredData);
  }, [selectedValue, field, setData, originalData]);

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
