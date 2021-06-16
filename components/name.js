import { style } from "../constants/style";
import { text } from "../constants/text";

import { useStore as useEditorStore } from "../store/editor";
import { useStore as useProjectStore } from "../store/projects";
import { useRef } from "react";

/**
 * Name input.
 */
export default function Name() {
  const current = useEditorStore((state) => state.current);
  const currentID = useEditorStore((state) => state.currentID);
  const setCurrent = useEditorStore((state) => state.setCurrent);
  const setProjectName = useProjectStore((state) => state.setProjectName);
  const textInput = useRef(null);

  function handleNameChange(event) {
    setProjectName(currentID, event.target.value);
    setCurrent(event.target.value);
  }

  function handleFocus(event) {
    event.target.value = current;
  }

  function handleFocusOut(event) {
    event.target.value = "";
  }

  return (
    <input
      type="text"
      className={`w-full border-b-2 mr-2 py-0 text-white h-full focus:ring-0 border-b-2 -top-px relative !border-transparent ${style.bg}`}
      onChange={(event) => handleNameChange(event)}
      onFocus={(event) => handleFocus(event)}
      onBlur={(event) => handleFocusOut(event)}
      ref={textInput}
      placeholder={current === "" ? text.emptyProject : current}
    />
  );
}
