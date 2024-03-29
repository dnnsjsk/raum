import { text } from "../constants/text";
import create from "zustand";
import { persist } from "zustand/middleware";
import { getUnique } from "../utils/getUnique";
import { setHistory } from "../utils/setHistory";

/**
 * Editor store.
 */
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
      setAll: (id, current, html, css, js, active = "editor") => {
        set({ active: active });
        set({
          current: current,
          currentID: id,
          currentCSS: css ? css : "",
          currentHTML: html ? html : "",
          currentJS: js ? js : "",
        });
        setHistory(id);
      },
    }),
    {
      name: "general",
    }
  )
);
