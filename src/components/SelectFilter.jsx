import React from "react";
import style from "./selectStyle.module.css";
const SelectFilter = ({ onChange, data, Filter }) => {
  return (
    <select
      name="Specialization"
      className={style.filter}
      value={Filter}
      onChange={onChange}
    >
      {data.map((item, idx) => {
        return (
          <option value={item.value} key={idx}>
            {item.specialization}
          </option>
        );
      })}
    </select>
  );
};

export default SelectFilter;
