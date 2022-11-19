/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import * as Fathom from "fathom-client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useFathom = () => {
  const router = useRouter();
  const id = process.env.NEXT_PUBLIC_FATHOM_ID as string;
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      Fathom.load(id, {
        includedDomains: ["adamrichardson.dev", "www.adamrichardson.dev"],
      });
    }

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [router.events]);
};
