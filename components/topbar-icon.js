import { style } from "../constants/style";

import EyeIcon from "@heroicons/react/solid/EyeIcon";
import EyeOffIcon from "@heroicons/react/solid/EyeOffIcon";
import { useStore as useEditorStore } from "../store/editor";

/**
 * Topbar icon.
 */
export default function TopBarIcon(props) {
  const editorMobile = useEditorStore((state) => state.editorMobile);
  const setEditorMobile = useEditorStore((state) => state.setEditorMobile);

  function handleSwitchViews() {
    if (editorMobile) {
      setEditorMobile(false);
    } else {
      setEditorMobile(true);
    }
  }

  return (
    <div
      role="button"
      onClick={props.type === "primary" ? handleSwitchViews : props.onClick}
      className={`text-white w-10 flex items-center justify-center h-full ${
        props.active
          ? "!bg-gray-800 !text-opacity-100 " + style.hover
          : (props.type === "primary" ? "text-opacity-100" : style.colorOpacity)
          ? props.type !== "primary"
            ? style.hover + " " + style.colorOpacity
            : "bg-blue-500 text-white"
          : ""
      } hover:text-opacity-100`}
    >
      {props.children}
      {props.type === "primary" && !editorMobile ? (
        <EyeOffIcon className={"w-5"} />
      ) : (
        props.type === "primary" && <EyeIcon className={"w-5"} />
      )}
    </div>
  );
}
