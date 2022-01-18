import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import UserContext from "./context/user";
import { shortenAddress } from "../utils/utils";

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
  {
    id: 2,
    url: "/exchange",
    text: "Exchange",
  },
];

const Sidebar = ({ closeSidebar, isSidebarOpen }: Props) => {
  const router = useRouter();
  const userContext = useContext(UserContext);

  return (
    <div
      className={`transition-all  duration-500  fixed top-0 ${
        isSidebarOpen ? "left-0 z-20" : "-left-64"
      }`}
    >
      <div className="flex h-screen overflow-y-auto flex-col bg-port-800  w-64 px-4 py-8 border-r border-port-800 shadow-sm shadow-port-800 min-h-screen relative">
        <button
          onClick={closeSidebar}
          className="absolute top-1 right-1 transition transform ease-linear duration-300  text-port-300 w-8 h-8 rounded-full flex items-center justify-center active:bg-port-300 focus:outline-none ml-6 hover:bg-port-200 hover:text-port-800"
        >
          <FontAwesomeIcon icon={faTimes} size="sm" />
        </button>
        <Link href="/">
          <h2 className="text-3xl font-semibold text-gray-800 cursor-pointer">
            <span className="text-port-300 ml-1">harbor</span>
          </h2>
        </Link>
        <div className="flex flex-col mt-6  justify-between flex-1">
          <nav className="text">
            {userContext.wallets?.length > 0 && (
              <div className="mt-5 rounded-md border border-port-300  p-3">
                {userContext.wallets.map((wallet, idx) => {
                  return (
                    <a
                      key={idx}
                      className={`capitalize flex items-center p-1 text-port-500 hover:text-port-300 text-sm transition transform ease-linear duration-300 `}
                    >
                      <span className="font-medium">
                        {shortenAddress(wallet)}
                      </span>
                    </a>
                  );
                })}
              </div>
            )}

            <Link href="/update-wallets">
              <a
                className={`capitalize flex items-center px-4 py-2 ${
                  "/update-wallets" === router.asPath
                    ? "bg-port-200 text-port-700"
                    : "text-port-100 hover:bg-port-200 hover:text-port-700 transition-colors duration-200 transform"
                }  rounded-md mt-5 `}
              >
                <span className="font-medium">Add Wallets</span>
              </a>
            </Link>
            <hr className="my-6 border-port-300" />
            {links.map((link, index) => {
              const { id, url, text } = link;
              return (
                <Link key={id} href={url}>
                  <a
                    className={`capitalize flex items-center px-4 py-2 ${
                      url === router.asPath
                        ? "bg-port-200 text-port-700"
                        : "text-port-100 hover:bg-port-200 hover:text-port-700 transition-colors duration-200 transform"
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
