import React from "react";

export default function Option(props){
  return(
    <option value={props.value}>{props.name}</option>
  )
}
