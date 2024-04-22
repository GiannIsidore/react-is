import { MenuContext } from "@/context/MenuContext";
import React, { useContext, useState } from "react";
import { FaBars, FaUserCircle, FaCaretDown } from "react-icons/fa";
import ThemeToggler from "@/components/ThemeToggler";

const MainHeader = () => {
  const { toggle } = useContext(MenuContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 flex justify-between items-center px-4 h-12 shadow-2xl">
      <div className="font-bold text-xl text-gray-900 dark:text-gray-100">
        LOGO NATO OR IDUNNO
      </div>
      <div className="flex justify-between items-center gap-4">
        <ThemeToggler /> {/* Include the ThemeToggler component */}
        <div onClick={toggle} className="lg:hidden">
          <FaBars className="cursor-pointer text-xl text-gray-900 dark:text-gray-100" />
        </div>
        <div className="relative">
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center cursor-pointer text-gray-900 dark:text-gray-100"
          >
            <FaUserCircle className="text-xl" />
            <FaCaretDown className="ml-2" />
          </div>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-xl z-10">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
