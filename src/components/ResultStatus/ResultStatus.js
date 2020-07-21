import React from "react";
import style from "./ResultStatus.module.scss";

export default function ResultStatus(props) {
  return <span className={props.isOpen ? style.isOpen : style.isClosed} />
}
