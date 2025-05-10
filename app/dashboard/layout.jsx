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
    if (user) {
      getUserDetail();
    }
  }, [user]); // Depend on user.pi_username instead of the entire user object

  const getUserDetail = async () => {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.pi_username, user?.pi_username));

    const fetchedUser = result[0];

    if (fetchedUser) {
      // Compare the fetched user data with the current user state
      if (
        !user ||
        user.id !== fetchedUser.id ||
        user.pi_username !== fetchedUser.pi_username ||
        user.imageUrl !== fetchedUser.imageUrl ||
        user.name !== fetchedUser.name ||
        user.email !== fetchedUser.email ||
        user.credits !== fetchedUser.credits ||
        user.subscription !== fetchedUser.subscription
      ) {
        setUser(fetchedUser); // Update the user state only if there are changes
      }
    }
  };
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <VideoDataContext.Provider value={{ videoData, setVideoData }}>
          <div>
            <div className="hidden md:block h-screen fixed mt-[65px] w-64">
              <SideNav />
            </div>
            <div>
              <Header />
              <div className="md:ml-64 p-4 md:p-10">{children}</div>
            </div>
          </div>
        </VideoDataContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default DashboradLayout;
