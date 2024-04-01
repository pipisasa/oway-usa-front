import React from "react";

import Contacts from "../../components/partials/Contacts";
import CostCalculator from "../../components/shared/CostCalculator";
import Search from "../../components/screens/main/Search";
import CountryTabs from "../../components/shared/admin/catalog/CountryTabs";
import AdminShopsPage from "../admin/shops-catalog";

export default function StepsPage() {
    return (
        <div>
            <Search/>
            <div className='container' style={{marginTop:"120px"}}>
                <AdminShopsPage/>
            </div>
            <Contacts/>
        </div>
    );
}