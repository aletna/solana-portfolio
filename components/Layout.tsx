import React, { ReactNode, useState } from "react";
import Head from "next/head";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

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
      <div className="min-h-screen bg-port-900 text-port-100">
        <button
          onClick={openSidebar}
          className={`${
            isSidebarOpen ? "-translate-x-8" : "translate-x-0"
          } fixed top-2 transition transform ease-linear duration-300 text-port-300 w-8 h-8 rounded-full flex items-center justify-center active:bg-port-300 focus:outline-none ml-6 hover:bg-port-200 hover:text-port-800 z-10`}
        >
          <FontAwesomeIcon icon={faBars} size="sm" />
        </button>
        <div
          className={`${
            isSidebarOpen
              ? "translate-x-64 w-screen-active-sidebar"
              : "translate-x-0 w-full"
          } transition-all  duration-500  w-screen  `}
        >
          {/* <div
            className=" image-container"
            style={{ width: "100%", height: "256px" }}
          >
            <Image
              src="/static/images/banner.jpg"
              layout="fill"
              className="image"
            ></Image>
          </div>

          <div
            className={`fixed top-16 ${
              isSidebarOpen ? " w-screen-active-sidebar" : " w-full"
            }`}
          >
            {heading && (
              <div className="p-8 w-full text-center  text-gray-600 text-4xl font-bold ">
                {heading}
              </div>
            )}
          </div>
           */}

          {heading && (
            <div className="p-8 w-full text-center  text-port-300 text-4xl font-bold ">
              {heading}
            </div>
          )}
          <div className="max-w-7xl mx-auto ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
