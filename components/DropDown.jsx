import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { GrProjects } from "react-icons/gr";
import { FaAngleRight } from "react-icons/fa";

const DropDown = ({ title, items, path }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <li className="flex flex-col justify-start items-start">
          <div
            className=" hover:bg-secondary hover:text-primary rounded-xl p-2 w-full flex flex-row justify-start items-center transition duration-300 ease-in-out cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <GrProjects className="mr-2" />
            <h3 className="flex-1 ">{title}</h3>
            <FaAngleRight
              className={`transform ${
                isOpen ? "rotate-90" : "rotate-0"
              } transition duration-300`}
            />
          </div>
          <ul
            className={`ml-8 mt-1 overflow-hidden transition-all duration-700 ease-in-out ${
              isOpen ? "opacity-100 max-h-[1000px]" : "opacity-0 max-h-0"
            }`}
          >
            {items.map((item, index) => (
              <li
                className="flex justify-start items-start gap-3 hover:bg-secondary hover:text-primary rounded-xl p-2 transition-all duration-300 ease-in-out"
                key={index}
              >
                <Link href={path[index]}>
                  <div className="cursor-pointer">{item}</div>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </div>
    </div>
  );
};

export default DropDown;
