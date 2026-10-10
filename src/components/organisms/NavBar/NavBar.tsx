"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
// shadcn
import { Button } from "@/components/ui/button";
// hooks
import useCurrentUser from "@/src/hooks/useCurrentUser";
import useIsClient from "@/src/hooks/useIsClient";
// zustand
import { useCountryAndCityStore } from "@/src/lib/store/useCountryAndCityStore";
// ui
import { User, MessagesCircle, Heart } from "lucide-react";
// components
import { SelectedOriginIndicator, ThemeToggle } from "../../atoms";

function NavBar() {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();
  const selectedCity = useCountryAndCityStore((state) => state.selectedCity);
  const isClient = useIsClient();
  // origin lives in localStorage, so the server never knows it
  const hasOrigin = isClient && !!selectedCity;

  return (
    <nav className="p-4 flex justify-between items-center shadow-lg">
      <Link
        href="/"
        className={`${hasOrigin ? "hidden md:block" : "block"} md:text-base lg:text-xl font-bold hover:cursor-pointer text-custom-blue`}
      >
        EasyBorder
      </Link>
      {hasOrigin && <SelectedOriginIndicator />}

      <div className="ml-auto md:ml-0 flex gap-5 items-center">
        <Link
          href="/community-feed"
          aria-label="Community Feed"
          className="hover:cursor-pointer hover:text-custom-blue font-semibold"
        >
          <MessagesCircle />
        </Link>
        <Link
          href="/favorites"
          aria-label="Favorites"
          className="hover:cursor-pointer hover:text-custom-blue font-semibold"
        >
          <Heart />
        </Link>
        <ThemeToggle />
        {isLoading ? null : user ? (
          <button
            onClick={() => router.push("/profile")}
            className="hover:cursor-pointer hover:text-custom-blue"
            aria-label="Profile"
          >
            <User className="" />
          </button>
        ) : (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
