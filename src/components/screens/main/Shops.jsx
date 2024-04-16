import React from "react";
import Link from "next/link"
import s from "@/styles/screens/main/Shops.module.scss";

export default function Shops() {
  return (
    <div className={`${s.shops} container`} data-aos="fade-up">
      <Link href="https://www.amazon.com/" target="_blank">
        <img src="/assets/images/amazon.svg" alt="" />
      </Link>
      <Link href="https://boxycharm.ipsy.com/" target="_blank">
        <img src="/assets/icons/boxy.svg" alt="" />
      </Link>
      <Link href="https://www.ebay.com/" target="_blank">
        <img src="/assets/images/ebay.svg" alt="" />
      </Link>
      <Link href="https://www.carters.com/" target="_blank">
        <img src="/assets/icons/carter.svg" alt="" />
      </Link>
    </div>
  );
}
