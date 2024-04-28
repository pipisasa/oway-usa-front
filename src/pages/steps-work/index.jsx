import MoreServices from "@/components/screens/main/MoreServices";
import StepWork from "@/components/screens/main/StepWork";
import React from "react";
import Contacts from "@/components/partials/Contacts";
import Join from "@/components/screens/main/Join";
import Illinois from "../size-chart/Illinois";

export default function StepsWork() {
  return (
    <main>
      <StepWork />
      <MoreServices />
      <Join />
      <Illinois/>
      <Contacts />
    </main>
  );
}
