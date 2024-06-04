import React from "react";
import Contacts from "../../components/partials/Contacts";
import Search from "../../components/screens/main/Search";
import AdminShopsSteps1 from "../admin/shops-catalog-steps";

export default function StepsPage() {
  return (
    <div>
      <Search />
      <div className="container" style={{ marginTop: "120px" }}>
        <AdminShopsSteps1 />
      </div>
      <Contacts />
    </div>
  );
}
