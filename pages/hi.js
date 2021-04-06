import { style } from "../constants/style";

import Head from "next/head";

export default function Hi() {
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
      hi
    </div>
  );
}
