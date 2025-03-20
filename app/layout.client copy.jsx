"use client";
import React, { useEffect, useState } from "react";
import Header from "app/dashboard/_components/Header";
import SideNav from "app/dashboard/_components/SideNav";
import { VideoDataContext } from "app/_context/VideoDataContext";
import { UserContext, UserProvider } from "app/_context/UserContext";
import { ThemeProvider } from "@/components/(mode-provider)/theme-provider";
import { Toaster } from "@/components/ui/sonner";

function DashboradLayout({ children }) {
  const [videoData, setVideoData] = useState([]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <UserProvider>
        <VideoDataContext.Provider value={{ videoData, setVideoData }}>
              <div className="md:ml-64 p-10">{children}</div>
        </VideoDataContext.Provider>
      </UserProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default DashboradLayout;
