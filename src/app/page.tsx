"use client";

import { useRouter } from "next/navigation";
// ui
import { Button } from "@/components/ui/button";
import { BadgeCheck, Zap, Users } from "lucide-react";
// constants
import { HOME_PAGE_TEXT } from "../lib/constants";

function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-15 mt-10">
      <section className="py-5 px-10 shadow-xl border border-zinc-900 rounded text-xl font-bold flex flex-col gap-10 text-custom-grey">
        <p>{HOME_PAGE_TEXT.description1}</p>
        <p>{HOME_PAGE_TEXT.description2}</p>
      </section>
      <section className="flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="flex gap-1 text-sm items-center text-custom-green">
          <BadgeCheck className="size-3.5" />
          <p>{HOME_PAGE_TEXT.feature1}</p>
        </div>
        <div className="flex gap-1 text-sm items-center text-custom-green">
          <Zap className="size-3.5" />
          <p>{HOME_PAGE_TEXT.feature2}</p>
        </div>
        <div className="flex gap-1 text-sm items-center text-custom-green">
          <Users className="size-3.5" />
          <p>{HOME_PAGE_TEXT.feature3}</p>
        </div>
      </section>
      <section className="flex gap-10">
        <Button variant="action" onClick={() => router.push("/country")}>
          {HOME_PAGE_TEXT.button1}
        </Button>
        <Button onClick={() => router.push("/register")}>
          {HOME_PAGE_TEXT.button2}
        </Button>
      </section>
    </div>
  );
}

export default HomePage;
