import { style } from "../constants/style";
import dynamic from "next/dynamic";

import TerminalIcon from "@heroicons/react/solid/TerminalIcon";
import QuestionMarkCircleIcon from "@heroicons/react/solid/QuestionMarkCircleIcon";
import CollectionIcon from "@heroicons/react/solid/CollectionIcon";

export default function Sidebar() {
  const classIcon = "w-5 place-self-center";
  const Button = dynamic(() => import("./sidebar-button"), { ssr: false });

  return (
    <nav className={`h-[var(--vh)] ${style.bg}`}>
      <div className={`border-b border-r h-full ${style.border}`}>
        <div
          className={`h-[40px] pointer-events-none text-xs text-white flex justify-center items-center w-full font-mono font-medium border-b ${style.border}`}
        >
          <span className={"md:hidden"}>R</span>
          <span className={"hidden md:block"}>Raum</span>
        </div>
        <div className={`divide-y border-b ${style.divide} ${style.border}`}>
          <Button type="about">
            <QuestionMarkCircleIcon className={classIcon} />
          </Button>
          <Button type="editor">
            <TerminalIcon className={classIcon} />
          </Button>
          <Button type="projects">
            <CollectionIcon className={classIcon} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
