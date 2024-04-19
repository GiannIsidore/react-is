"use client";
import React, { useContext } from "react";
import MainHeader from "./MainHeader";
import { MenuContext } from "@/context/MenuContext";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { GrProjects } from "react-icons/gr";
import { FaAngleRight } from "react-icons/fa";
const MainLayout = ({ children }) => {
  const { open } = useContext(MenuContext);
  return (
    <div className="bg-gray-100 w-screen min-h-screen ">
      <MainHeader />
      <div className="flex justify-start items-start">
        <aside
          className={`bg-primary text-primary-foreground rounded-lg overflow-hidden h-[calc(100vh-4rem)] transition-all duration-200 ease-in-out justify-between  ${
            open ? "w-60 p-4 " : "w-0 transition-all "
          } lg:w-60 lg:p-4`}
        >
          <ul>
            <li className="flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
              <AiOutlineHome className="mr-2" />
              <Link href="/">Home</Link>
            </li>
            <Link href="/inventory">
              <li className="flex flex-col justify-start items-start">
                <div className="  hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2 w-full flex flex-row justify-start items-center">
                  <GrProjects className="mr-2" />
                  <h3 className="flex-1">Inventory</h3>
                  <FaAngleRight />
                </div>
                <ul className="ml-8 mt-1">
                  <li className="flex justify-center items-center gap-3  hover:bg-blue-300 hover:text-blue-800 rounded-xl p-2">
                    <Link href="/inventory/add">Add to inv</Link>
                  </li>
                </ul>
              </li>
            </Link>
            <Link href="/employee">
              <li className="flex flex-col justify-start items-start">
                <div className="  hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2 w-full flex flex-row justify-start items-center">
                  <GrProjects className="mr-2" />
                  <h3 className="flex-1">Employee</h3>
                  <FaAngleRight />
                </div>
                <ul className="ml-8 mt-1">
                  <li className="flex justify-center items-center gap-3  hover:bg-blue-300 hover:text-blue-800 rounded-xl p-2">
                    <Link href="/employee/add">Add emp</Link>
                  </li>
                </ul>
              </li>
            </Link>
          </ul>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
