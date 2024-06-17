import ImportedKilograms from "@/components/shared/admin/charts/ImportedKilograms";
import InvoicesIssued from "@/components/shared/admin/charts/InvoicesIsued";
import UserCount from "@/components/shared/admin/charts/UserCount";
import React from "react";
import s from "@/styles/admin/StatPage.module.scss";
import ImportedProducts from "@/components/shared/admin/charts/ImportedProducts";
import Breadcrumbs from "@/components/shared/admin/bread/Bread";

export default function AdminMainPage() {
  return (
    <section className={s.stat_page}>
      <Breadcrumbs />
      <div className={s.first_block}>
        <UserCount />
        <ImportedKilograms />
      </div>
      <div className={s.second_block}>
        <ImportedProducts />
        <InvoicesIssued />
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.accessToken;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
