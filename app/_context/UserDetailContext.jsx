"use client";
import { createContext, useState } from "react";

export const UserDetailContext = createContext();

export const UserDetailProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState({
    pi_username: null,  // Store Pi username
    imageUrl:"https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yczRNd1FabzM1U21uYnhTR0NIRm5nQjFRRUwifQ",
    name: null,
    email: null 
    // Remove Clerk-specific data
  });

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
};
