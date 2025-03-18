'use client'
import { db } from 'configs/db';
import { Users } from 'configs/schema';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { VideoDataContext } from './_context/VideoDataContext';
import { UserDetailContext } from "app/_context/UserDetailContext"; // Import UserDetailContext


function Provider({ children }) {
  const [videoData, setVideoData] = useState({}); // Initialize videoData
  const { user } = useContext(UserDetailContext);
  useEffect(() => {
    user && isNewUser();
  }, [user])
  const isNewUser = async () => {
    const result = await db.select().from(Users).where(eq(Users.pi_username, pi_username));
    {
      if (!result[0]) {
        await db.insert(Users).values({
          pi_username: user.username, // Use pi_username
          name: user.first_name ? `${userData.first_name} ${userData.last_name}` : userData.username, // Combine first and last name
          imageUrl: user?.imageUrl,
        });
      }
    }
  }

  return (

    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
      <VideoDataContext.Provider value={{ videoData, setVideoData }}>
        <div>{children}</div>
      </VideoDataContext.Provider>
    </PayPalScriptProvider>

  )
}
// Custom hook to use the VideoDataContext
// Custom hook to use the VideoDataContext
export const useVideoData = () => {
  return useContext(VideoDataContext);
};
export default Provider