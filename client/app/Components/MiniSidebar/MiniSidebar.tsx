"use client";
import { useUserContext } from "@/context/userContext";
import IconCheck from "@/public/icons/IconCheck";
import IconDeleteAll from "@/public/icons/IconDeleteAll";
import IconFileCheck from "@/public/icons/IconFileCheck";
import IconGrid from "@/public/icons/IconGrid";
import IconStopwatch from "@/public/icons/IconStopwatch";
import { link } from "fs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";


function MiniSidebar() {
  const pathname = usePathname();
  const { logoutUser } = useUserContext();

  const getStrokeColor = (link: string) => {
    return pathname === link ? "#3aafae" : "#71717a";
  };

  const navItems = [
    {
      icon: <IconGrid strokeColor={getStrokeColor("/")} />,
      title: "Todas",
      link: "/",
    },
    {
      icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
      title: "Concluidas",
      link: "/completed",
    },
    {
      icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
      title: "Pendentes",
      link: "/pending",
    },
    {
      icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
      title: "Atrasadas",
      link: "/overdue",
    },
  ];
  return (
    <div className="basis-[5rem] flex flex-col bg-[#f9f9f9]">
      <div className="flex items-center justify-center h-[5rem]">
        <Image src="/logo.png" width={28} height={28} alt="logo" />
      </div>

      <div className="mt-8 flex-1 flex flex-col items-center justify-between">
        <ul className="flex flex-col gap-10">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link href={item.link}>{item.icon}</Link>

              {/* Hover Tooltip */}
              <span className="u-triangle absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white bg-[#3aafae] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.title}
              </span>
            </li>
          ))}
        </ul>

       

          <button
        className="mt-auto mb-10 mx-4 py-2 px-3 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3aafae] transition duration-200 ease-in-out"
        onClick={logoutUser}
      >
        <i className="fa-solid fa-right-from-bracket"></i>
      </button>
    
      </div>
    </div>
  );
}

export default MiniSidebar;
