import create from "zustand";
import { text } from "../constants/text";
import { persist } from "zustand/middleware";
import { merge, unset } from "lodash";

export const useStore = create(
  persist(
    (set, get) => ({
      projects: {},
      setProject: (id, type, value, name = false) =>
        set((state) => ({
          projects: merge(state.projects, {
            [id]: {
              name: name
                ? name
                : state.projects[id] && state.projects[id]["name"]
                ? state.projects[id]["name"]
                : text.emptyProject,
              date:
                state.projects[id] && state.projects[id]["date"]
                  ? state.projects[id]["date"]
                  : Date.now(),
              id: id,
              [type]: value,
            },
          }),
        })),
      setAllProjects: (id, value, name = false) =>
        set((state) => ({
          projects: merge(state.projects, {
            [id]: {
              name: name
                ? name
                : state.projects[id] && state.projects[id]["name"]
                ? state.projects[id]["name"]
                : text.emptyProject,
              date:
                state.projects[id] && state.projects[id]["date"]
                  ? state.projects[id]["date"]
                  : Date.now(),
              id: id,
              css: value.css,
              html: value.html,
              js: value.js,
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
