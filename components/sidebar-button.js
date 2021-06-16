import { style } from "../constants/style";

import { Switch } from "@headlessui/react";
import { useStore as useEditorStore } from "../store/editor";
import { useStore as useProjectStore } from "../store/projects";

/**
 * Sidebar button.
 */
export default function SidebarButton(props) {
  const active = useEditorStore((state) => state.active);
  const projectsCount = useProjectStore((state) => state.projectsCount);
  const setActive = useEditorStore((state) => state.setActive);

  function handleClick() {
    setActive(props.type);
  }

  return (
    <Switch
      checked={active === props.type}
      onChange={handleClick}
      className={`w-full py-3 md:py-4 text-xs relative uppercase grid gap-2 ${
        style.color
      } ${style.hover}
        ${active === props.type ? "text-opacity-100" : style.colorOpacity}`}
    >
      {props.type === "projects" && (
        <span
          className={`absolute text-[8px] font-mono right-0 top-0 w-3 h-3 md:text-[10px] md:h-5 md:w-5 flex items-center justify-center ${style.color} ${style.colorOpacity}`}
        >
          {projectsCount}
        </span>
      )}
      {props.children}
    </Switch>
  );
}
