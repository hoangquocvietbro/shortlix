"use client";
import {Search,ArrowRightFromLine, FileUp,Captions,Cookie, ReceiptText, AudioLines,CircleDollarSign,Delete,FileImage,FileVideo, Languages, PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import RemotionVideo from "./RemotionVideo";

function SideNav() {
  const menuOption = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: <PanelsTopLeft />,
    },
    {
      id: 2,
      name: "Create Image",
      path: "/dashboard/create-image",
      icon: <FileImage/>,
    },
    {
      id: 3,
      name: "Create Video",
      path: "/dashboard/create-video",
      icon: <FileVideo />,
    },
    {
      id: 4,
      name: "Generated Voice",
      path: "/dashboard/voice",
      icon: <AudioLines />,
    },
    //     {
    //   id: 5,
    //   name: "Edit Subtitles",
    //   path: "/dashboard/Indevelop",
    //   icon: <Captions />,
    // },
    // {
    //   id: 5,
    //   name: "Hardsub Remove",
    //   path: "/dashboard/Indevelop",
    //   icon: <ArrowRightFromLine />,
    // },
    // {
    //   id: 5,
    //   name: "Video Translate",
    //   path: "/dashboard/Indevelop",
    //   icon: <Languages />,
    // }
    // ,
    // {
    //   id: 5,
    //   name: "Explore",
    //   path: "/dashboard/Indevelop",
    //   icon: <Search />,
    // },
    {
      id: 5,
      name: "Video Translation",
      path: "/dashboard/translate-video",
      icon: <Languages />,
    },
    {
      id: 6,
      name: "Buy Credits",
      path: "/dashboard/buy-credits",
      icon: <CircleDollarSign />,
    },
    {
      id: 7,
      name: "Terms of Service",
      path: "/terms",
      icon: <ReceiptText />,
    },
    {
      id: 8,
      name: "Privacy Policy",
      path: "/privacy",
      icon: <Cookie />,
    },
  ];
  const pathName = usePathname();
  return (
    <div className="w-64 h-screen shadow-md shadow-neutral-900 p-5">
      <div className="grid gap-3">
        {menuOption.map((item, idx) => (
          <Link href={item.path} key={idx}>
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 hover:bg-primary hover:text-black cursor-pointer rounded-md hover:font-bold ${
                pathName === item.path ? "bg-primary text-black font-bold" : ""
              }`}
            >
              {item.icon}
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
