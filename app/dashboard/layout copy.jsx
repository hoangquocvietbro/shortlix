"use client";
import React, { useContext,useEffect, useState } from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import { VideoDataContext } from "app/_context/VideoDataContext";
import { UserContext } from "app/_context/UserContext";
import { db } from "configs/db";
import { Users } from "configs/schema";
import { eq } from "drizzle-orm";

function DashboradLayout({ children }) {
  const [videoData, setVideoData] = useState([]);
  const { user,setUser } = useContext(UserContext);
  useEffect(() => {
    user && getUserDetail();
  }, [user]);
  const getUserDetail = async () => {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.pi_username, user?.pi_username));
      console.log(user?.pi_username)
      console.log(result[0])
      setUser(result[0]);
  };
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <VideoDataContext.Provider value={{ videoData, setVideoData }}>
          <div>
            <div className=" hidden md:block h-screen fixed mt-[65px] w-64">
              <SideNav />
            </div>
            <div>
              <Header />
              <div className="md:ml-64 p-10">{children}</div>
            </div>
          </div>
        </VideoDataContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default DashboradLayout;
