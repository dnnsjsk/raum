import { style } from "../constants/style";

import dynamic from "next/dynamic";
import { useStore } from "../store/editor";

export default function Main() {
  const TopBar = dynamic(() => import("./topbar"), { ssr: false });
  const Editor = dynamic(() => import("../components/editor"), { ssr: false });
  const Projects = dynamic(() => import("../components/projects"), {
    ssr: false,
  });

  const active = useStore((state) => state.active);

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
