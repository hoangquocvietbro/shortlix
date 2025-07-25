"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import {
  Languages,
  Cookie,
  ReceiptText,
  FileVideo,
  PanelsTopLeft,
  Menu,
  X,
  AudioLines,
  CircleDollarSign,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "app/_context/UserContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the sidebar
  const pathName = usePathname();
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the state when the menu button is clicked
  };

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
      icon: <FileVideo />,
    },
    {
      id: 3,
      name: "Create Video",
      path: "/dashboard/create-video",
      icon: <FileVideo />,
    },
    {
      id: 4,
      name: "Voice Generation",
      path: "/dashboard/voice",
      icon: <AudioLines />,
    },
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

  return (
    <div className="p-4 px-5 flex items-center justify-between shadow-sm shadow-neutral-900">
      {/* Logo and Title */}
      <Link href={"/dashboard"}>
        <div className="flex gap-3 items-center">
          <Image src="/logo.svg" alt="logo" width={30} height={30} />
          <h2 className="font-bold text-sm">Shortlix</h2>
        </div>
      </Link>

      {/* User Button and Hamburger Menu */}
      <div className="flex gap-3 items-center">
        <div
          className="flex gap-2 flex-row mx-2 justify-center items-center cursor-pointer hover:scale-105 transition-all duration-300 "
          onClick={() => router.replace("/dashboard/upgrade")}
        >
          <Image src="/coin.png" alt="coin" width={30} height={30} />
          <h2 className="font-bold text-base drop-shadow-lg">
            {user?.credits}
          </h2>
        </div>

        <button
          className="md:hidden p-4"
          onClick={toggleSidebar}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar for small devices */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
            onClick={toggleSidebar}
          ></div>

          <div
            id="mobile-menu"
            className={`fixed top-0 left-0 h-full bg-black/80 shadow-lg p-6 w-80 z-50 transform transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } md:hidden`}
          >
            {/* Sidebar Content */}
            <nav>
              {menuOption.map((item) => (
                <Link href={item.path} key={item.id} onClick={toggleSidebar}>
                  <div
                    className={`flex items-center mt-[15%] gap-1 mb-4 cursor-pointer text-sm  ${
                      pathName === item.path
                        ? "text-black bg-primary rounded-md p-2 font-bold"
                        : "text-gray-300"
                    }`}
                  >
                    {item.icon}
                    <h2>{item.name}</h2>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
