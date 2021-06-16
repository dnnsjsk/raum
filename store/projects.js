import create from "zustand";
import { text } from "../constants/text";
import { persist } from "zustand/middleware";
import { merge, unset } from "lodash";

/**
 * Project store.
 */
export const useStore = create(
  persist(
    (set) => ({
      projects: {},
      setProject: (id, value, name = false) =>
        set((state) => ({
          projects: merge(state.projects, {
            [id]: {
              id: id,
              name: name
                ? name
                : state.projects[id] && state.projects[id]["name"]
                ? state.projects[id]["name"]
                : text.emptyProject,
              date:
                state.projects[id] && state.projects[id]["date"]
                  ? state.projects[id]["date"]
                  : Date.now(),
              html:
                value && value.html
                  ? value.html
                  : state.projects[id]
                  ? state.projects[id]["html"]
                  : "",
              css:
                value && value.css
                  ? value.css
                  : state.projects[id]
                  ? state.projects[id]["css"]
                  : "",
              js:
                value && value.js
                  ? value.js
                  : state.projects[id]
                  ? state.projects[id]["js"]
                  : "",
            },
          }),
        })),
      setProjectName: (id, value) =>
        set((state) => ({
          projects: merge(state.projects, {
            [id]: {
              name: value === "" ? text.emptyProject : value,
            },
          }),
        })),
      deleteProject: (id) => set((state) => unset(state.projects, id)),
      deleteProjects: () =>
        set(() => ({
          projects: {},
        })),
      projectsCount: "",
      setProjectsCount: () =>
        set((state) => ({ projectsCount: Object.keys(state.projects).length })),
    }),
    {
      name: "projects",
    }
  )
);
