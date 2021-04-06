import { style } from "../constants/style";

import dynamic from "next/dynamic";
import Head from "next/head";
import Sidebar from "../components/sidebar";
import { useEffect } from "react";
import { useStore } from "../store/editor";

export default function Index() {
  const setActive = useStore((state) => state.setActive);

  const Main = dynamic(() => import("../components/main"), {
    ssr: false,
  });
  const Content = dynamic(() => import("../components/content"), {
    ssr: false,
  });

  useEffect(() => {
    if (window.location.href.includes("?r=")) {
      setActive("editor");
    }
  }, []);

  return (
    <div className={`overflow-hidden w-full h-[var(--vh)] ${style.bg}`}>
      <Head>
        <title>Raum</title>
        <link rel="icon" href="/favicon.ico" />
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
