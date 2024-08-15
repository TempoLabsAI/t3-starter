import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

// Import the dev tools and initialize them
import { TempoDevtools } from "tempo-devtools";
import { useEffect } from "react";

import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_TEMPO) {
      TempoDevtools.init();
    }
  }, []);

  return (
    <div className={GeistSans.className}>
      <Component {...pageProps} />
    </div>
  );
};

export default api.withTRPC(MyApp);
