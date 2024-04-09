import React from "react";
import s from "@/styles/components/shared/Loading.module.scss";

export default function Loading() {
  return (
    <div className={s.spinner_container}>
      <b className={s.spinner}></b>
    </div>
  );
}
