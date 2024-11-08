import ProductsList from "@/components/shared/admin/ProductsList";
import PagesTabs from "@/components/shared/admin/catalog/PagesTabs";
import React from "react";
import s from "@/styles/components/shared/cards/ProdustCard.module.scss";
import Breadcrumbs from "@/components/shared/admin/bread/Bread";

export default function AdminProductsPage() {
  return (
    <div>
      <div className={s.pages_tabs}>
        <Breadcrumbs />
        <PagesTabs />
      </div>
      <ProductsList />
    </div>
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
