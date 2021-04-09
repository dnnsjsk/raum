import { text } from "../constants/text";
import { style } from "../constants/style";

import { useStore as useEditorStore } from "../store/editor";
import { useStore as useProjectStore } from "../store/projects";
import useClipboard from "react-use-clipboard";
import { getUnique } from "../utils/getUnique";

import TopBarButton from "./topbar-button";
import TopBarIcon from "./topbar-icon";
import Name from "./name";
import { Menu } from "@headlessui/react";
import DotsHorizontalIcon from "@heroicons/react/solid/DotsHorizontalIcon";

export default function TopBar() {
  const current = useEditorStore((state) => state.current);
  const currentCSS = useEditorStore((state) => state.currentCSS);
  const currentHTML = useEditorStore((state) => state.currentHTML);
  const currentJS = useEditorStore((state) => state.currentJS);
  const icon = `w-5`;
  const id = getUnique();
  const moreLink = `text-white text-sm whitespace-nowrap py-1 cursor-pointer hover:underline`;
  const setAll = useEditorStore((state) => state.setAll);
  const setEditorMobile = useEditorStore((state) => state.setEditorMobile);
  const setProject = useProjectStore((state) => state.setProject);
  const setProjectsCount = useProjectStore((state) => state.setProjectsCount);

  const [copied, setCopied] = useClipboard(
    `${window.location.origin}?s=${encodeURIComponent(
      JSON.stringify({
        name: current,
        css: currentCSS,
        html: currentHTML,
        js: currentJS,
      })
    )}`
  );

  function handleDuplicateProject() {
    setProject(
      id,
      {
        css: currentCSS,
        html: currentHTML,
        js: currentJS,
      },
      current + " Duplicate"
    );
    setAll(id, current + " Duplicate", currentCSS, currentHTML, currentJS);
    setProjectsCount();
    setEditorMobile(true);
  }

  function handleNewProject() {
    setProject(id);
    setAll(id, text.emptyProject);
    setProjectsCount();
    setEditorMobile(true);
  }

  return (
    <div
      className={`grid z-50 grid-flow-col grid-cols-[1fr,max-content] h-full items-center border-b ${style.bg} ${style.border}`}
    >
      <div
        className={`h-full relative w-[calc(100%+40px)] left-[-40px] md:w-[calc(100%+60px)] md:left-[-60px] lg:w-full lg:left-0 lg:block`}
      >
        <Name />
      </div>
      <div
        className={`z-10 flex relative -left-px lg:left-0 divide-x ${style.divide} justify-end max-w-max`}
      >
        <div className={`border-l ${style.border}`}>
          <TopBarButton type="js" />
        </div>
        <div>
          <TopBarButton type="html" />
        </div>
        <div>
          <TopBarButton type="css" />
        </div>
        <div className={"relative"}>
          <Menu>
            {({ open }) => (
              <>
                <Menu.Button
                  className={`h-full flex border-b-2 border-transparent ${
                    style.hover
                  } ${open && "border-gray-800"}`}
                >
                  <TopBarIcon active={open}>
                    <DotsHorizontalIcon className={icon} />
                  </TopBarIcon>
                </Menu.Button>
                <Menu.Items
                  className={`absolute top-[40px] rounded-b md:rounded-bl right-0 flex flex-col py-2 px-4 bg-gray-800 shadow-lg border ${style.border}`}
                >
                  <Menu.Item onClick={setCopied}>
                    <a className={moreLink}>Share Project</a>
                  </Menu.Item>
                  <Menu.Item onClick={handleDuplicateProject}>
                    <a className={moreLink}>Duplicate project</a>
                  </Menu.Item>
                  <Menu.Item onClick={handleNewProject}>
                    <a className={moreLink}>New project</a>
                  </Menu.Item>
                </Menu.Items>
              </>
            )}
          </Menu>
        </div>
        <div className={"block md:hidden"}>
          <TopBarIcon type={"primary"} />
        </div>
      </div>
    </div>
  );
}
