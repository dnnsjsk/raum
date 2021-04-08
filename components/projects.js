import { style } from "../constants/style";
import { text } from "../constants/text";
import { useStore as useProjectStore } from "../store/projects";
import { useStore as useEditorStore } from "../store/editor";
import { useReducer } from "react";

import TrashIcon from "@heroicons/react/solid/TrashIcon";
import { getUnique } from "../utils/getUnique";

export default function Projects() {
  const currentId = useEditorStore((state) => state.currentID);
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const deleteProjects = useProjectStore((state) => state.deleteProjects);
  const language = useEditorStore((state) => state.editor);
  const projects = useProjectStore((state) => state.projects);
  const projectsLength = Object.keys(projects).length;
  const setAll = useEditorStore((state) => state.setAll);
  const setEditorMobile = useEditorStore((state) => state.setEditorMobile);
  const setProject = useProjectStore((state) => state.setProject);
  const setProjectsCount = useProjectStore((state) => state.setProjectsCount);

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  function handleUseProject(id) {
    setProject(id, {
      [language]: projects[id]["name"][language],
    });
    setAll(
      id,
      projects[id]["name"] || text.emptyProject,
      projects[id]["css"],
      projects[id]["html"],
      projects[id]["js"]
    );
  }

  function handleDelete(e, id) {
    e.stopPropagation();
    deleteProject(id);
    const newId =
      projects[Object.keys(projects)[Object.keys(projects).length - 1]]["id"];
    const newName =
      projects[Object.keys(projects)[Object.keys(projects).length - 1]]["name"];
    setProject(newId, {
      [language]: projects[newId][language],
    });
    setAll(
      newId,
      newName,
      projects[newId]["css"],
      projects[newId]["html"],
      projects[newId]["js"],
      false,
      "projects"
    );
    setProjectsCount();
    forceUpdate();
  }

  function handleDeleteAll() {
    const id = getUnique();

    deleteProjects();
    setProject(id, {
      css: "",
      html: "",
      js: "",
    });
    setAll(id, text.emptyProject);
    setProjectsCount();
    setEditorMobile(true);
  }

  return (
    <div className="h-[calc(var(--vh)-40px)]">
      <div
        className={`flex h-[40px] sticky top-0 z-10 ${style.bg} justify-between items-center flex-wrap px-3 border-b ${style.border}`}
      >
        <h1 className={`text-gray-500 text-sm border-b-2 border-transparent`}>
          <strong className={`font-semibold text-white`}>
            {projectsLength}
          </strong>{" "}
          project{projectsLength > 1 && "s"} in library
        </h1>
        {projectsLength > 1 && (
          <button
            className={`text-red-500 text-sm hover:underline`}
            onClick={() => handleDeleteAll()}
          >
            Delete all
          </button>
        )}
      </div>

      <ul className={"h-full scrollbar overflow-y-auto"}>
        {Object.keys(projects)
          .sort()
          .reverse()
          .map((item, index) => {
            const date = new Date(projects[item]["date"]);
            const id = projects[item]["id"];
            const name = projects[item]["name"];

            let [month, day, year] = date
              .toLocaleDateString("en-US")
              .split("/");

            return (
              <li
                onClick={() => handleUseProject(id)}
                key={`key-${index}`}
                className="relative cursor-pointer pl-8 py-4 pr-3 grid group gap-2 xs:gap-4 grid-cols-[1fr,auto] xs:grid-cols-[1fr,auto,100px] text-white items-center bg-opacity-25 cursor bg-gray-600 bg-opacity-0 transition duration-75 hover:bg-opacity-5"
              >
                <span
                  className={`text-sm md:text-base lg:text-lg cursor-pointer relative`}
                >
                  {id === currentId && (
                    <div className="absolute -left-5 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500" />
                  )}
                  {name === id ? text.emptyProject : name}
                </span>
                {projectsLength > 1 ? (
                  <button
                    onClick={(e) => handleDelete(e, id)}
                    className={`duration-200 transition opacity-0 group-hover:opacity-100`}
                  >
                    <TrashIcon
                      className={`w-5 h-5 text-red-500 transform duration-200 transition hover:scale-110`}
                    />
                  </button>
                ) : (
                  <div />
                )}
                <span
                  className={`text-gray-500 text-sm md:text-base lg:text-lg md:justify-self-end`}
                >
                  {day + "/" + month + "/" + year}
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
