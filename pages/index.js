import { style } from "../constants/style";

import dynamic from "next/dynamic";
import Head from "next/head";
import Sidebar from "../components/sidebar";
import { useStore } from "../store/editor";
import { useEffect } from "react";

export default function Index() {
  /**
   * Turn off SSR.
   */
  const Main = dynamic(() => import("../components/main"), {
    ssr: false,
  });
  const Content = dynamic(() => import("../components/content"), {
    ssr: false,
  });

  const setActive = useStore((state) => state.setActive);

  useEffect(() => {
    setActive("editor");

    /**
     * Get real viewport height.
     */
    function vh() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh * 100}px`);
    }

    vh();

    window.addEventListener("resize", () => {
      vh();
    });
  });

  return (
    <div className={`overflow-hidden w-full h-[var(--vh)] ${style.bg}`}>
      <Head>
        <link
          rel="icon"
          href="/static/images/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/static/images/favicon-192x192.png"
          sizes="192x192"
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="/static/images/favicon-180x180.png"
        />
        <title>Raum</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        className={`grid grid-cols-[40px,1fr] min-w-[300px] md:grid-cols-[60px,1fr,1fr] ${style.bg}`}
      >
        <Sidebar />
        <Main />
        <Content />
      </div>
    </div>
  );
}
