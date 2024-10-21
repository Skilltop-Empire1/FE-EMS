import React from "react";
import style from "./Loader.module.css";

function Loader() {
  return (
    <div
      className={`${style["lds-facebook-wrapper"]} flex justify-center items-center w-full h-screen`}
    >
      <div className={style["lds-facebook"]}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
