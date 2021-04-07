import { style } from "../constants/style";

import { Switch } from "@headlessui/react";
import { useStore as useEditorStore } from "../store/editor";
import { useStore as useProjectStore } from "../store/projects";

export default function SidebarButton(props) {
  const active = useEditorStore((state) => state.active);
  const setActive = useEditorStore((state) => state.setActive);
  const projectsCount = useProjectStore((state) => state.projectsCount);

  return (
    <Switch
      checked={active === props.type}
      onChange={() => setActive(props.type)}
      className={`w-full py-3 md:py-4 text-xs relative uppercase grid gap-2 ${
        style.color
      } ${style.hover}
        ${active === props.type ? "text-opacity-100" : style.colorOpacity}`}
    >
      {props.type === "projects" && (
        <span className={`bg-blue-500 absolute text-white text-[9px] font-mono right-1 top-1 w-3 h-3 md:top-2 md:right-2 md:h-4 md:w-4 flex items-center justify-center rounded-full top-0`}>
          {projectsCount}
        </span>
      )}
      {props.children}
    </Switch>
  );
}
