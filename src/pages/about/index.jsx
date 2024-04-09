import React from "react";
import Contacts from "../../components/partials/Contacts";
import About from "../../components/screens/main/About";
import AboutMission from "../../components/screens/main/AboutMission";
import MissionTarget from "../../components/screens/main/MissionTarget";
import AboutBusiness from "../../components/screens/main/AboutBusiness";
import AboutWorld from "../../components/screens/main/AboutWorld";
import AboutClient from "../../components/screens/main/AboutClient";
import Faq from "@/components/partials/Faq";

export default function AboutPage() {
  return (
    <div>
      <About />
      <AboutMission />
      <MissionTarget />
      <AboutBusiness />
      <AboutWorld />
      <Faq />
      <AboutClient />
      <Contacts />
    </div>
  );
}
