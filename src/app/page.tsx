"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Zap, Users } from "lucide-react";

function HomePage() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center gap-10 h-full p-5">
      <section>
        <p>
          Border wait times app where users can see various travel types and
          wait times. Community feed where users can post images and comments on
          their experiences.
        </p>
      </section>
      <section className="flex gap-12 justify-center flex-wrap">
        <div className="flex gap-1 mt-10 mb-5 text-sm items-center text-custom-green">
          <BadgeCheck className="size-3.5" />
          <p>Official CBP data</p>
        </div>
        <div className="flex gap-1 mt-10 mb-5 text-sm items-center text-custom-green">
          <Zap className="size-3.5" />
          <p>Updated Regularly</p>
        </div>
        <div className="flex gap-1 mt-10 mb-5 text-sm items-center text-custom-green">
          <Users className="size-3.5" />
          <p>Community Driven</p>
        </div>
      </section>
      <section className="flex gap-10">
        <Button variant="action" onClick={() => router.push("/country")}>
          See Wait Times
        </Button>
        <Button>Register</Button>
      </section>
    </section>
  );
}

export default HomePage;
