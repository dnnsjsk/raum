import { style } from "../constants/style";

import dynamic from "next/dynamic";
import Head from "next/head";
import Sidebar from "../components/sidebar";
import { useEffect, useRef } from "react";
import { useStore as useEditorStore, useStore } from "../store/editor";
import { getUnique } from "../utils/getUnique";
import { text } from "../constants/text";
import { isEmpty } from "lodash";
import { useStore as useProjectStore } from "../store/projects";

export default function Index() {
  const Main = dynamic(() => import("../components/main"), {
    ssr: false,
  });
  const Content = dynamic(() => import("../components/content"), {
    ssr: false,
  });

  const setActive = useStore((state) => state.setActive);
  const setAll = useEditorStore((state) => state.setAll);
  const setAllProjects = useProjectStore((state) => state.setAllProjects);
  const setEditor = useEditorStore((state) => state.setEditor);
  const setProjectsCount = useProjectStore((state) => state.setProjectsCount);
  const projects = useRef(useProjectStore.getState().projects);

  const id = useEditorStore((state) => state.currentID) || getUnique();

  useEffect(() => {
    if (window.location.href.includes("?r=")) {
      setActive("editor");
    }

    window.addEventListener("popstate", function (event) {
      console.log(event);
    });

    if (window.location.href.includes("?r=")) {
      const newId = getUnique();
      const string = window.location.href.split("?r=").pop();
      const object = JSON.parse(decodeURIComponent(string));
      setAllProjects(
        newId,
        {
          css: object["css"],
          html: object["html"],
          js: object["js"],
        },
        object["name"] === "" ? text.emptyProject : object["name"]
      );
      setAll(
        newId,
        object["name"],
        object["css"],
        object["html"],
        object["js"]
      );
      setEditor("js");
      history.replaceState("default", "", window.location.href.split("?r=")[0]);
    } else if (!localStorage.getItem("projects") || isEmpty(projects)) {
      setAllProjects(id, {
        css: "",
        html: "",
        js: "",
      });
      setAll(id, text.emptyProject, "", "", "");
    } else if (
      window.location.href.includes("/project/") &&
      projects.current[window.location.href.split("/project/").pop()]
    ) {
      const splitId = window.location.href.split("/project/").pop();
      setAllProjects(splitId, {
        css: projects.current[splitId]["css"],
        html: projects.current[splitId]["html"],
        js: projects.current[splitId]["js"],
      });
      setAll(
        splitId,
        projects.current[splitId]["name"],
        projects.current[splitId]["css"],
        projects.current[splitId]["html"],
        projects.current[splitId]["js"]
      );
      setActive("editor", splitId);
    } else if (window.location.href.includes("projects")) {
      setActive("projects");
    } else if (window.location.href.includes("about")) {
      setActive("about");
    } else if (localStorage.getItem("projects")) {
      setAllProjects(id, {
        css: projects.current[id]["css"],
        html: projects.current[id]["html"],
        js: projects.current[id]["js"],
      });
      setAll(
        id,
        projects.current[id]["name"],
        projects.current[id]["css"],
        projects.current[id]["html"],
        projects.current[id]["js"]
      );
      setActive("editor", id);
    }

    setProjectsCount();
  }, []);

  return (
    <div className={`overflow-hidden w-full h-[var(--vh)] ${style.bg}`}>
      <Head>
        <title>Raum</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        className={`grid grid-cols-[40px,1fr] min-w-[300px] md:grid-cols-[60px,1fr,1fr] ${style.bg}`}
      >
        <Sidebar />
        <Main />
        <Content />
      </div>
    </div>
  );
}
