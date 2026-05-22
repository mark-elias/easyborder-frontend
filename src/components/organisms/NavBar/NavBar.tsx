"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
// shadcn
import { Button } from "@/components/ui/button";

function NavBar() {
  const router = useRouter();
  return (
    <nav className="p-4 flex justify-between items-center shadow-lg">
      <Link
        href="/"
        className="text-xl font-bold hover:cursor-pointer text-custom-blue"
      >
        EasyBorder
      </Link>
      <div className="flex gap-5">
        <Button onClick={() => router.push("/login")}>Login</Button>
        <Button variant="outline" onClick={() => router.push("/register")}>
          Sign Up
        </Button>
      </div>
    </nav>
  );
}

export default NavBar;
