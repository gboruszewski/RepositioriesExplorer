import React from "react";
import { Form } from "react-bootstrap";

export default function SearchBar({value, placeholder, onChange}) {

  return (
    <Form>
      <Form.Control type="text" placeholder={placeholder} value={value} onChange={(ev) => onChange(ev.target.value)} />
    </Form>
  )
}
