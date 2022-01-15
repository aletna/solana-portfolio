import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  isSidebarOpen: boolean;
  closeSidebar: any;
};

const links = [
  {
    id: 0,
    url: "/",
    text: "Overview",
  },
  {
    id: 1,
    url: "/nfts",
    text: "NFTs",
  },
];

const Sidebar = ({ closeSidebar, isSidebarOpen }: Props) => {
  const router = useRouter();
  console.log(router.asPath);
  return (
    <div
      className={`transition-all  duration-500  fixed top-0 ${
        isSidebarOpen ? "left-0 z-20" : "-left-64"
      }`}
    >
      <div className="flex h-screen overflow-y-auto flex-col bg-white  w-64 px-4 py-8 border-r min-h-screen relative">
        <button
          onClick={closeSidebar}
          className="absolute top-1 right-1  text-gray-600 w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800"
        >
          <FontAwesomeIcon icon={faTimes} size="sm" />
        </button>
        <Link href="/">
          <h2 className="text-3xl font-semibold text-gray-800 cursor-pointer">
            <span className="text-indigo-500 ml-1">harbor</span>
          </h2>
        </Link>
        <div className="flex flex-col mt-6  justify-between flex-1">
          <nav className="text">
            <Link href="/update-wallets">
              <a className="flex items-center px-4 py-2 mt-5 rounded-md text-gray-600 hover:text-gray-700 hover:bg-gray-200 transition-colors transform">
                <span className="font-medium">Add Wallets</span>
              </a>
            </Link>
            <hr className="my-6" />
            {links.map((link, index) => {
              const { id, url, text } = link;
              return (
                <Link key={id} href={url}>
                  <a
                    className={`capitalize flex items-center px-4 py-2 ${
                      url === router.asPath
                        ? "bg-gray-200 text-gray-700"
                        : "text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 transform"
                    }  rounded-md mt-5 `}
                  >
                    <span className="font-medium">{text}</span>
                  </a>
                </Link>
              );
            })}
          </nav>
          {/* <div className="flex items-center px-4 -mx-2 mt-5">
            <img
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              alt="avatar"
              className="h-9 w-9 mx-2 object-center object-cover rounded-full"
            />
            <h4 className="mx-2 font-medium text-gray-800 hover:underline cursor-pointer">
              ALETNA
            </h4>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
