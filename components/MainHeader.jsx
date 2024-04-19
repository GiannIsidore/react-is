"use client";
import { MenuContext } from "@/context/MenuContext";
import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
const MainHeader = () => {
  const { toggle } = useContext(MenuContext);
  return (
    <div className="bg-white flex justify-between items-center px-4 h-12 ">
      <div>LOGO NATO OR IDUNNO</div>
      <div className="flex justify-between items-center gap-4">
        <div onClick={toggle} className="lg:hidden">
          <FaBars className="cursor-pointer" />
        </div>
        <div>account</div>
      </div>
    </div>
  );
};

export default MainHeader;
