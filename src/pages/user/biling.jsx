import BankCardsList from "@/components/shared/admin/BankCardsList";
import React from "react";

export default function BilingPage() {
  return (
    <section>
      <BankCardsList />
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
