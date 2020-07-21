import React from "react";
import { Spinner } from "react-bootstrap";
import style from "./AppSpinner.module.scss";

export default function AppSpinner() {

  return (
    <div className={style.spinner}>
      <Spinner animation="border" />
    </div>
  )
}
