import MoreServices from "@/components/screens/main/MoreServices";
import StepWork from "@/components/screens/main/StepWork";
import React from "react";
import Contacts from "@/components/partials/Contacts";
import Join from "@/components/screens/main/Join";

export default function StepsWork() {
  return (
    <main>
      <StepWork />
      <MoreServices />
      <Join />
      <Contacts />
    </main>
  );
}
