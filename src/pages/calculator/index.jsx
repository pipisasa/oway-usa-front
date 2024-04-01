import React from "react";
import Advantage from "../../components/screens/main/ Advantage";
import MoreInfo from "../../components/screens/main/MoreInfo";
import Contacts from "../../components/partials/Contacts";
import CostCalculator from "../../components/shared/CostCalculator";
import ProductSlider from "../../components/screens/main/ProductSlider";

export default function CalculatorPage() {
    return (
        <div>
            <CostCalculator/>
            <Advantage p='Расчет веса' h2='Как рассчитываются фактический и объемный вес.' menu='calc'/>
            <ProductSlider/>
            <MoreInfo menu='calc'/>
            <Contacts/>
            
        </div>
    );
}
