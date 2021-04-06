import { style } from "../constants/style";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useStore } from "../store/editor";

export default function Main() {
  const TopBar = dynamic(() => import("./topbar"), { ssr: false });
  const Editor = dynamic(() => import("../components/editor"), { ssr: false });
  const Projects = dynamic(() => import("../components/projects"), {
    ssr: false,
  });

  const active = useStore((state) => state.active);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      {active === "projects" ? (
        <Projects />
      ) : (
        <div className={`h-full w-auto grid grid-rows-[40px,1fr] ${style.bg}`}>
          <TopBar />
          <Editor />
        </div>
      )}
    </div>
  );
}
