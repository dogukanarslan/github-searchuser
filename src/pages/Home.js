import React from "react";
import {Users} from "../components";

export default function Home(props){
  return(
    <Users allData={props.allData} istanbulData={props.istanbulData} ankaraData={props.ankaraData} izmirData={props.izmirData}/>
  )
}
