"use client";
import React, { useContext } from "react";
import MainHeader from "./MainHeader";
import { MenuContext } from "@/context/MenuContext";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { GrProjects } from "react-icons/gr";
import { FaAngleRight } from "react-icons/fa";
import DropDown from "./DropDown";

const MainLayout = ({ children }) => {
  const { open } = useContext(MenuContext);
  return (
    <div className="bg-gray-100 dark:bg-gray-800 w-screen min-h-screen">
      <MainHeader className="shadow-2xl" />
      <div className="flex justify-start items-start">
        <aside
          className={`bg-primary dark:bg-gray-800 text-primary-foreground dark:text-gray-200 right-shadow overflow-auto h-[calc(100vh-4rem)] transition-all duration-200 ease-in-out justify-between  ${
            open
              ? "w-60 p-4  transition-all duration-200 "
              : "w-0  transition-all duration-200 "
          } lg:w-60 lg:p-4`}
        >
          <div>
            {["Inventory", "Employee"].map((title, index) => (
              <ul
                className={`transition-all duration-300 ease-in-out delay-${
                  index * 200
                }`}
                key={index}
              >
                <DropDown
                  path={[
                    "/inventory",
                    "/inventory/receive",
                    "/inventory/register",
                    "/inventory/reports",
                  ]}
                  title={title}
                  items={[
                    "Armory Preview",
                    "Armory Receives",
                    "Item Register",
                    "Armory Reports",
                  ]}
                />
              </ul>
            ))}
          </div>
        </aside>
        <main className="flex-1 m-2 p-4 bg-white dark:bg-gray-800 shadow-2xl rounded-sm">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
