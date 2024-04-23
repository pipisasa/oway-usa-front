import React from "react";
import Contacts from "../../components/partials/Contacts";
import Services from "../../components/screens/main/Services";
import ProvideServices from "../../components/screens/main/ProvideServices";
import Advantage from "../../components/screens/main/ Advantage";

export default function ServicesPage() {
  return (
    <div>
      <Services />
      <Advantage
        menu="service"
        h2="Оптимизируйте бюджет с нашими бесплатными услугами"
        p="Бесплатные услуги "
      />
      <ProvideServices />
      <Contacts />
    </div>
  );
}
