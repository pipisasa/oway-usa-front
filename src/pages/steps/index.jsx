import React from "react";

import Contacts from "../../components/partials/Contacts";
import CostCalculator from "../../components/shared/CostCalculator";
import Search from "../../components/screens/main/Search";

export default function StepsPage() {
    return (
        <div>
            <Search/>

            <Contacts/>
        </div>
    );
}