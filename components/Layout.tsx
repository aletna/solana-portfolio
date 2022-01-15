import React, { ReactNode, useContext, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

type Props = {
  children?: ReactNode;
  title?: string;
  heading?: string;
};

const Layout = ({
  children,
  title = "This is the default title",
  heading,
}: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <div
        // style={{
        //   backgroundColor: theme[currentTheme].main,
        //   color: theme[currentTheme].text,
        // }}
        className="min-h-screen"
      >
        <button
          onClick={openSidebar}
          className={`${
            isSidebarOpen ? "-translate-x-8" : "translate-x-0"
          } fixed top-2 transition transform ease-linear duration-500 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800 z-10`}
        >
          {/* <FaBars className="w-5 h-5" /> */}
          <FontAwesomeIcon icon={faBars} size="sm" />
        </button>
        <div
          className={`${
            isSidebarOpen
              ? "translate-x-64 w-screen-active-sidebar"
              : "translate-x-0 w-full"
          } transition-all  duration-500    w-screen  `}
        >
          <div className="max-w-7xl mx-auto ">
            {heading && (
              <div className="p-8 w-full text-center text-2xl">{heading}</div>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
