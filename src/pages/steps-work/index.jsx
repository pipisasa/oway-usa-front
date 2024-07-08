import MoreServices from "@/components/screens/main/MoreServices";
import StepWork from "@/components/screens/main/StepWork";
import React from "react";
import Contacts from "@/components/partials/Contacts";
import Join from "@/components/screens/main/Join";
import Illinois from "../size-chart/Illinois";
import Advantage from "@/components/screens/main/ Advantage";

export default function StepsWork() {
  return (
    <main>
      <StepWork />
      <MoreServices />
      <Join />
      <Illinois />
      <Advantage
        p="Расчет веса"
        h2="Как рассчитываются фактический и объемный вес."
        menu="illinois"
      />
      <Contacts />
    </main>
  );
}
