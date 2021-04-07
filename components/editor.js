import dynamic from "next/dynamic";

import { useMonaco } from "@monaco-editor/react";
import { useStore as useEditorStore } from "../store/editor";
import { useStore as useProjectStore } from "../store/projects";
import { useEffect, useRef } from "react";

import { isEmpty } from "lodash";
import { getUnique } from "../utils/getUnique";
import { text } from "../constants/text";

export default function Editor() {
  /**
   * Setup editor.
   */
  const editorRef = useRef(null);
  const codeEl = useRef(null);
  const Code = dynamic(() => import("@monaco-editor/react"), { ssr: false });
  const monaco = useMonaco();

  const editorProps = {
    colorDecorators: true,
    padding: {
      top: 20,
    },
    scrollbar: {
      useShadows: false,
    },
    lineHeight: 20,
    fontSize: 12,
    minimap: {
      enabled: false,
    },
    automaticLayout: true,
  };

  const id = useEditorStore((state) => state.currentID) || getUnique();
  const language = useEditorStore((state) => state.editor);
  const projects = useRef(useProjectStore.getState().projects);
  const setCurrentCSS = useEditorStore((state) => state.setCurrentCSS);
  const setCurrentHTML = useEditorStore((state) => state.setCurrentHTML);
  const setCurrentJS = useEditorStore((state) => state.setCurrentJS);
  const setProject = useProjectStore((state) => state.setProject);

  function handleEditorChange(value) {
    setProject(id, language, btoa(value));

    if (language === "css") {
      setCurrentCSS(btoa(value));
    }

    if (language === "html") {
      setCurrentHTML(btoa(value));
    }

    if (language === "js") {
      setCurrentJS(btoa(value));
    }
  }

  function handleEditorDidMount(editor) {
    editorRef.current = editor;

    window.addEventListener("resize", () => {
      editor.layout({
        width: "auto",
        height: "auto",
      });

      const { width, height } = editor._domElement.getBoundingClientRect();
      editor.layout({
        width,
        height,
      });
    });
  }

  useEffect(() => {
    /**
     * Set up monaco.
     */
    if (monaco) {
      monaco.editor.defineTheme("raum", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#18181B",
        },
      });
    }
  }, [monaco]);

  return (
    <Code
      ref={codeEl}
      options={editorProps}
      defaultLanguage={language === "js" ? "javascript" : language}
      width={"100%"}
      height={"100%"}
      value={
        typeof window !== "undefined" &&
        projects &&
        !isEmpty(projects[Object.keys(projects)[0]]) &&
        projects[Object.keys(projects)[0]][id] &&
        projects[Object.keys(projects)[0]][id][language] !== undefined &&
        projects[Object.keys(projects)[0]][id][language]
          ? atob(projects[Object.keys(projects)[0]][id][language])
          : ""
      }
      theme="raum"
      loading={""}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
    />
  );
}
