// UserContext.jsx
"use client";
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    pi_username: null,  // Store Pi username
    imageUrl: null,
    name: null,
    email: null,
    credits: 0,
    subscription: false,
    // Remove Clerk-specific data
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
