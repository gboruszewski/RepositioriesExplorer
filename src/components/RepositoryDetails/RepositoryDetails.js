import React from "react";
import { Jumbotron } from "react-bootstrap";
import style from "./RepositoryDetails.module.scss";

export default function RepositoryDetails({details}) {

  return (
    <Jumbotron className={style.wrapper}>
      <h5 className={style.label}>{details?.title}</h5>
      <h5 className={style.watchers}>
        {details?.watchers}
        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24">
          <g>
            <rect fill="none" height="24" width="24" x="0"/>
            <polygon points="14.43,10 12,2 9.57,10 2,10 8.18,14.41 5.83,22 12,17.31 18.18,22 15.83,14.41 22,10"/>
          </g>
        </svg>
      </h5>
      <div className={style.description}>
        {details?.description}
      </div>
    </Jumbotron>
  )
}
