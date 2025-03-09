"use client";
import { Button } from "../components/ui/button";
import Link from "next/link";
// import { ThemeToggle } from "../components/(mode-provider)/themeToggle";
import { useAuth, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = useAuth();
  if (userId) {
    redirect("/dashboard");
  }
  return (
    <div className="flex justify-center items-center mt-5">
      {/* <ThemeToggle /> */}
      <Link href={"/sign-in"}>
        <Button> SIGN IN </Button>
        <UserButton />
      </Link>
      
      {/* Embed another site using an iframe */}
      <iframe sandbox="allow-same-origin allow-scripts"
        src="https://fastest-ge79.onrender.com/" // Replace with the URL you want to embed
        width="100%"
        height="500px"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
}

