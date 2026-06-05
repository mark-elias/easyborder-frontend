"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
// shadcn
import { Button } from "@/components/ui/button";
// hooks
import useCurrentUser from "@/src/hooks/useCurrentUser";
// ui
import { User } from "lucide-react";

function NavBar() {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();

  return (
    <nav className="p-4 flex justify-between items-center shadow-lg">
      <Link
        href="/"
        className="text-xl font-bold hover:cursor-pointer text-custom-blue"
      >
        EasyBorder
      </Link>
      <div className="flex gap-5">
        {isLoading ? null : user ? (
          <button
            onClick={() => router.push("/profile")}
            className="hover:cursor-pointer hover:text-custom-blue"
            aria-label="Profile"
          >
            <User className="" />
          </button>
        ) : (
          <>
            <Button onClick={() => router.push("/login")}>Login</Button>
            <Button variant="outline" onClick={() => router.push("/register")}>
              Sign Up
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
