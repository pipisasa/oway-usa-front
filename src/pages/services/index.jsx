import React from "react";

import Contacts from "../../components/partials/Contacts";
import Faq from "../../components/partials/Faq";
import Feedback from "../../components/shared/Feedback";
import Services from "../../components/screens/main/Services";
import ProvideServices from "../../components/screens/main/ProvideServices";
import Advantage from "../../components/screens/main/ Advantage";

export default function ServicesPage() {
    return (
        <div>
            <Services/>
            <ProvideServices/>
            <Advantage menu='service' h2='Оптимизируйте бюджет с нашими бесплатными услугами' p='Бесплатные услуги '/>
            <Contacts/>
        </div>
    );
}