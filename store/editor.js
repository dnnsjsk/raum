import { text } from "../constants/text";
import create from "zustand";
import { persist } from "zustand/middleware";
import { getUnique } from "../utils/getUnique";
import { setHistory } from "../utils/setHistory";

export const useStore = create(
  persist(
    (set) => ({
      active: "editor",
      setActive: (value) => set({ active: value }),
      editor: "js",
      setEditor: (value) => set({ editor: value }),
      editorMobile: true,
      setEditorMobile: (value) => set({ editorMobile: value }),
      current: text.emptyProject,
      setCurrent: (value) => set({ current: value }),
      currentID: getUnique(),
      setCurrentID: (value) => set({ currentID: value }),
      currentCSS: "",
      setCurrentCSS: (value) =>
        set({ currentCSS: value === "" || value === undefined ? "" : value }),
      currentHTML: "",
      setCurrentHTML: (value) =>
        set({ currentHTML: value === "" || value === undefined ? "" : value }),
      currentJS: "",
      setCurrentJS: (value) =>
        set({ currentJS: value === "" || value === undefined ? "" : value }),
      setAll: (id, current, css, html, js, replace = false) => {
        set({ active: "editor" });
        set({
          current: current,
          currentID: id,
          currentCSS: css,
          currentHTML: html,
          currentJS: js,
        });
        setHistory(
          id,
          replace === false
            ? "/project/" + id
            : window.location.href.split("?r=")[0]
        );
      },
    }),
    {
      name: "general",
    }
  )
);
