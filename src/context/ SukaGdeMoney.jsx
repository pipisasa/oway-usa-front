import { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/router";

const ModalContext = createContext(false);

function RouteBlocker() {
  const router = useRouter();
  const modalOpen = useContext(ModalContext);

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (modalOpen && url !== "/") {
        router.push("/");
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [modalOpen, router]);

  return null;
}
