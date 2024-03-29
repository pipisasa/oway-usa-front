import React from "react";

import Contacts from "../../components/partials/Contacts";
import CostCalculator from "../../components/shared/CostCalculator";
import Search from "../../components/screens/main/Search";
import About from "../../components/screens/main/About";
import AboutMission from "../../components/screens/main/AboutMission";
import MissionTarget from "../../components/screens/main/MissionTarget";
import AboutBusiness from "../../components/screens/main/AboutBusiness";
import AboutWorld from "../../components/screens/main/AboutWorld";
import Faq from "../../components/partials/about/Faq";
import AboutClient from "../../components/screens/main/AboutClient";

export default function AboutPage() {
    return (
        <div>
            <About/>
            <AboutMission/>
            <MissionTarget/>
            <AboutBusiness/>
            <AboutWorld/>
            <Faq/>
            <AboutClient/>
            <Contacts/>
        </div>
    );
}