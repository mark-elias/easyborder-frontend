"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
// shadcn
import { Button } from "@/components/ui/button";
// hooks
import useCurrentUser from "@/src/hooks/useCurrentUser";
// ui
import { User, MessagesCircle, Heart } from "lucide-react";
// components
import { SelectedOriginIndicator } from "../../atoms";

function NavBar() {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();

  return (
    <nav className="p-4 flex justify-between items-center shadow-lg">
      <Link
        href="/"
        className=" text-xs lg:text-xl font-bold hover:cursor-pointer text-custom-blue"
      >
        EasyBorder
      </Link>
      <SelectedOriginIndicator />

      <div className="flex gap-5 items-center">
        <Link
          href="/community-feed"
          aria-label="Community Feed"
          className="hover:cursor-pointer hover:text-custom-blue font-semibold"
        >
          <MessagesCircle className="md:hidden" />
          <span className="hidden md:inline">Community Feed</span>
        </Link>
        {isLoading ? null : user ? (
          <Link
            href="/favorites"
            aria-label="Favorites"
            className="hover:cursor-pointer hover:text-custom-blue font-semibold"
          >
            <Heart className="md:hidden" />
            <span className="hidden md:inline">Favorites</span>
          </Link>
        ) : null}
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
