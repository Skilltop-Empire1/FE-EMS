import React from "react";
import style from "./MainContainer.module.css";

function MainContainer({ children }) {
  return <main className={style.container}>{children}</main>;
}

export default MainContainer;
