import { useStore as useEditorStore } from "../store/editor";
import { getDoc } from "../utils/getDoc";

export default function Content() {
  const active = useEditorStore((state) => state.active);
  const currentCSS = useEditorStore((state) => state.currentCSS);
  const currentHTML = useEditorStore((state) => state.currentHTML);
  const currentJS = useEditorStore((state) => state.currentJS);
  const editorMobile = useEditorStore((state) => state.editorMobile);

  function handleDoc() {
    const css = atob(currentCSS);
    const html = atob(currentHTML);
    const js = atob(currentJS);
    return getDoc(css, html, js);
  }

  return (
    <iframe
      className={`fixed w-[calc(100%-40px)] left-[40px] h-[calc(100%-40px)] top-[40px] ${
        editorMobile === false && active === "editor" ? "block" : "hidden"
      } md:relative md:top-0 md:left-0 z-10 md:block bg-white md:w-full md:h-full`}
      src={`data:text/html;base64,${handleDoc()}`}
    />
  );
}
