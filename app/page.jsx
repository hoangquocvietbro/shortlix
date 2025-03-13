"use client";
import { Button } from "../components/ui/button";
import Link from "next/link";
// import { ThemeToggle } from "../components/(mode-provider)/themeToggle";
import { useAuth, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && userId) {
      redirect("/dashboard");
    }

    if (isLoaded && !userId) {
        redirect("/sign-in");
    }
  }, [userId, isLoaded]);


  // Render a loading state or placeholder while checking authentication
  return (
    <div className="flex justify-center items-center mt-5">
      {/* <ThemeToggle /> */}
      <div>
       {/* Optionally display a loading spinner here */}
      </div>
      {/* <Link href={"/sign-in"}>
        <Button> SIGN IN </Button>
        <UserButton />
      </Link> */}
      
      {/* Embed another site using an iframe */}
    </div>
  );
}
