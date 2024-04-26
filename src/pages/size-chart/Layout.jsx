import React  from "react";
import TheHeader from "./TheHeader";

export default function Layout({ children }) {


  return (
    <main className="ebat">
      <main className="">
      <TheHeader  />
        {children}</main>
    </main>
  );
}
