import MoreServices from "@/components/screens/main/MoreServices";
import StepWork from "@/components/screens/main/StepWork";
import React from "react";
import Contacts from "@/components/partials/Contacts";
import Join from "@/components/screens/main/Join";
import Illinois from "../size-chart/Illinois";
import AdvantageSteps from "@/components/screens/main/ AdvantageSteps";

export default function StepsWork() {
  return (
    <main>
      <StepWork />
      <MoreServices />
      <Join />
      <Illinois />
      <AdvantageSteps
        p="Калькулятор usps"
        h2="Как посчитать доставку через usps"
        menu="illinois"
      />
      <Contacts />
    </main>
  );
}
