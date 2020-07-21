import React from "react";
import { Button } from "react-bootstrap";
import style from "./SearchBar.module.scss";

export default function SearchBar({value, placeholder, onChange}) {

  return (
    <Button
      className={style.searchBar}
      as="input"
      type="text"
      variant="light"
      placeholder={placeholder}
      value={value}
      onChange={(ev) => onChange(ev.target.value)}
      block
    />
  )
}
