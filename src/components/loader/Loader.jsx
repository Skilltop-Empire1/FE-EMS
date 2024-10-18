import React from "react";
import style from "./Loader.module.css";

function Loader() {
  return (
    <div className={style["lds-facebook-wrapper"]}>
      <div className={style["lds-facebook"]}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
