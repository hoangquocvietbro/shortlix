'use client'
import { db } from 'configs/db';
import { Users } from 'configs/schema';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { VideoDataContext } from './_context/VideoDataContext';
import { UserContext } from "app/_context/UserContext"; // Import UserContext


function Provider({ children }) {
  const [videoData, setVideoData] = useState({}); // Initialize videoData
  const { user,setUser } = useContext(UserContext);
  useEffect(() => {
    user && user.pi_username&& isNewUser();
  }, [user])
  const isNewUser = async () => {
    const result = await db.select().from(Users).where(eq(Users.pi_username, user.pi_username));
    {
      if (!result[0]) {
        await db.insert(Users).values({
          pi_username: user.pi_username, // Use pi_username
          name: user.first_name ? `${user.first_name} ${user.last_name}` : user.pi_username, // Combine first and last name
          imageUrl: (user?.imageUrl)?null:"https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yczRNd1FabzM1U21uYnhTR0NIRm5nQjFRRUwifQ",
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