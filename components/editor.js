import dynamic from "next/dynamic";

import { useMonaco } from "@monaco-editor/react";
import { useStore as useEditorStore } from "../store/editor";
import { useStore as useProjectStore } from "../store/projects";
import { useEffect, useRef } from "react";

import { isEmpty } from "lodash";
import { getUnique } from "../utils/getUnique";
import { text } from "../constants/text";
import { welcome } from "../constants/welcome";

/**
 * The code editor.
 */
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
  const setAll = useEditorStore((state) => state.setAll);
  const setCurrentCSS = useEditorStore((state) => state.setCurrentCSS);
  const setCurrentHTML = useEditorStore((state) => state.setCurrentHTML);
  const setCurrentJS = useEditorStore((state) => state.setCurrentJS);
  const setEditor = useEditorStore((state) => state.setEditor);
  const setProject = useProjectStore((state) => state.setProject);
  const setProjectsCount = useProjectStore((state) => state.setProjectsCount);

  function handleEditorChange(value) {
    setProject(id, {
      [language]: btoa(value),
    });

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

    document.body.classList.add("loaded");
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

    /**
     * If URL is shareable link.
     */
    if (window.location.href.includes("?s=")) {
      const newId = getUnique();
      const href = window.location.href;
      const string = (
        href.includes("&fbclid")
          ? href.substr(0, href.lastIndexOf("&fbclid"))
          : href
      ).split("?s=")[1];
      const object = JSON.parse(decodeURIComponent(string));
      setProject(
        newId,
        {
          html: object["html"],
          css: object["css"],
          js: object["js"],
        },
        object["name"] === "" ? text.emptyProject : object["name"]
      );
      setAll(
        newId,
        object["name"],
        object["html"],
        object["css"],
        object["js"]
      );
      setEditor("html");
      /**
       * If local storage is empty. (= new visitor)
       */
    } else if (!localStorage.getItem("projects") || isEmpty(projects)) {
      setProject(id, {
        html: btoa(welcome.html),
        css: btoa(welcome.css),
      });
      setAll(id, text.emptyProject, btoa(welcome.html), btoa(welcome.css));
      setEditor("html");
      /**
       * If URL is project and exists in library.
       */
    } else if (
      window.location.href.includes("/project/") &&
      projects.current[window.location.href.split("/project/").pop()]
    ) {
      const splitId = window.location.href.split("/project/").pop();
      setProject(splitId, {
        html: projects.current[splitId]["html"],
        css: projects.current[splitId]["css"],
        js: projects.current[splitId]["js"],
      });
      setAll(
        splitId,
        projects.current[splitId]["name"],
        projects.current[splitId]["html"],
        projects.current[splitId]["css"],
        projects.current[splitId]["js"]
      );
      /**
       * Otherwise get first project item.
       */
    } else if (localStorage.getItem("projects")) {
      setProject(id, {
        html: projects.current[id]["html"],
        css: projects.current[id]["css"],
        js: projects.current[id]["js"],
      });
      setAll(
        id,
        projects.current[id]["name"],
        projects.current[id]["html"],
        projects.current[id]["css"],
        projects.current[id]["js"]
      );
    }

    setProjectsCount();
  });

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
