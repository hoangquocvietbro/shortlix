"use client";
import { createContext, useState } from "react";

export const UserDetailContext = createContext();

export const UserDetailProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState({
    pi_username: "hoangquocvietbro",  // Store Pi username
    // Remove Clerk-specific data
  });

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
};
