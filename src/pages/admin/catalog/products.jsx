import ProductsList from "@/components/shared/admin/ProductsList";
import PagesTabs from "@/components/shared/admin/catalog/PagesTabs";
import React from "react";

export default function AdminProductsPage() {
  return (
    <div>
      <PagesTabs />
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
