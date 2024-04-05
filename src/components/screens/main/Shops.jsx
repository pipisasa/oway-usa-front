import React from "react";
import s from "@/styles/screens/main/Shops.module.scss";

export default function Shops() {
  return (
    <div className={`${s.shops} container`}>
      <img src="/assets/icons/amazon.svg" alt="" />
      <img src="/assets/icons/boxy.svg" alt="" />
      <img src="/assets/icons/ebay.svg" alt="" />
      <img src="/assets/icons/carter.svg" alt="" />
    </div>
  );
}
