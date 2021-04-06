import { style } from "../constants/style";

import { Switch } from "@headlessui/react";
import { useStore } from "../store/editor";

export default function SidebarButton(props) {
  const active = useStore((state) => state.active);
  const setActive = useStore((state) => state.setActive);

  return (
    <Switch
      checked={active === props.type}
      onChange={() => setActive(props.type)}
      className={`w-full py-3 md:py-4 text-xs uppercase grid gap-2 ${
        style.color
      } ${style.hover}
        ${active === props.type ? "text-opacity-100" : style.colorOpacity}`}
    >
      {props.children}
    </Switch>
  );
}
