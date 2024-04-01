import React from "react";

import Contacts from "../../components/partials/Contacts";

import Faq from "../../components/partials/Faq";
import Shops from "../../components/screens/main/Shops";
import Markets from "../../components/screens/main/Markets";
import StoresDinamyc from "../../components/partials/StoresDinamyc";
import ProductSlider from "../../components/screens/main/ProductSlider";

export default function MarketsPage() {
    return (
        <div>
            <Markets/>
            <ProductSlider/>
            <StoresDinamyc span='Похожие магазины' h1='Мы выбрали для Вас лучшие онлайн-магазины'/>
            <Shops/>
            <Contacts/>
        </div>
    );
}