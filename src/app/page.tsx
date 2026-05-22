"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Zap, Users } from "lucide-react";

function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-15 mt-10">
      <section className="py-5 px-10 shadow-xl border border-zinc-900 rounded text-xl font-bold flex flex-col gap-10 text-custom-grey">
        <p>
          EasyBorder provides reliable border wait times using official CBP data
          for all port of entries and crossing methods
        </p>
        <p>
          Compare crossings, save your favorite lanes, and share your border
          crossing experiences with other travelers
        </p>
      </section>
      <section className="flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="flex gap-1 text-sm items-center text-custom-green">
          <BadgeCheck className="size-3.5" />
          <p>Official CBP data</p>
        </div>
        <div className="flex gap-1 text-sm items-center text-custom-green">
          <Zap className="size-3.5" />
          <p>Updated Regularly</p>
        </div>
        <div className="flex gap-1 text-sm items-center text-custom-green">
          <Users className="size-3.5" />
          <p>Community Driven</p>
        </div>
      </section>
      <section className="flex gap-10">
        <Button variant="action" onClick={() => router.push("/country")}>
          See Wait Times
        </Button>
        <Button onClick={() => router.push("/register")}>Sign Up</Button>
      </section>
    </div>
  );
}

export default HomePage;
