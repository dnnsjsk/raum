import { style } from "../constants/style";

import { Switch } from "@headlessui/react";
import { useStore as useEditorStore, useStore } from "../store/editor";

export default function TopbarButton(props) {
  const editor = useStore((state) => state.editor);
  const setEditor = useStore((state) => state.setEditor);
  const setEditorMobile = useEditorStore((state) => state.setEditorMobile);

  function handleChange() {
    setEditor(props.type);
    setEditorMobile(true);
  }

  return (
    <Switch
      checked={editor === props.type}
      onChange={handleChange}
      className={`w-10 text-xs uppercase font-semibold lg:w-20 xl:w-24 relative border-b-2 h-[40px] ${
        style.color
      } ${style.hover} ${
        editor === props.type
          ? "border-blue-500 text-opacity-100"
          : "border-transparent " + style.colorOpacity
      }`}
    >
      <span className={`hidden lg:block`}>{props.type}</span>
      <span className={`lg:hidden`}>{props.type.charAt(0)}</span>
    </Switch>
  );
}
