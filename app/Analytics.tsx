/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import * as Fathom from "fathom-client";

export default function Analytics({}) {
  const id = process.env.NEXT_PUBLIC_FATHOM_ID as string;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    Fathom.load(id, {
      includedDomains: ["adamrichardson.dev", "www.adamrichardson.dev"],
    });

    let newPageViewPath: string | undefined;

    if (pathname) {
      newPageViewPath = pathname + searchParams.toString();
      Fathom.trackPageview({
        url: newPageViewPath,
        referrer: document.referrer,
      });
    }
  }, [pathname, searchParams]);

  return <></>;
}
