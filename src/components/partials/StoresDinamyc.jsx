import React from "react";
import s from "@/styles/partials/StoresDinamyc.module.scss";

export default function StoresDinamyc(props) {
  return (
    <div className={`${s.mission} container`}>
      <span>{props.span}</span>
      <h1>{props.h1}</h1>
    </div>
  );
}
