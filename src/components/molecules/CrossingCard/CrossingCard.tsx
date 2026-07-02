import Link from "next/link";
import type { Crossing } from "@/src/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PortStatusBadge } from "@/src/components/atoms";
import { AvailableLaneIcons } from "@/src/components/molecules";
import { CROSSINGS_PAGE_TEXT } from "@/src/lib/constants";

interface Props {
  crossing: Crossing;
}

export function CrossingCard({ crossing }: Props) {
  return (
    <Link href={`/wait-times/${crossing._id}`} className="block">
      <Card
        className="w-[350px] h-full shadow-lg
        hover:cursor-pointer hover:scale-[1.03]
        transition-transform duration-200 ease-in-out"
      >
        <CardHeader>
          <div className="flex justify-between items-baseline">
            <CardTitle>{crossing.portName}</CardTitle>
            <CardDescription>Port #{crossing.portNumber}</CardDescription>
          </div>
          <CardDescription className="font-semibold">
            {crossing.crossingName}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 font-semibold mt-3">
          <p>
            {CROSSINGS_PAGE_TEXT.portStatusText}
            <PortStatusBadge status={crossing.portStatus} />
          </p>
          <p>
            {CROSSINGS_PAGE_TEXT.hoursOfOperationText}
            <span className="font-normal">{crossing.hours}</span>
          </p>
          <AvailableLaneIcons
            hasCommercialLanes={crossing.hasCommercialLanes}
            hasPassengerLanes={crossing.hasPassengerLanes}
            hasPedestrianLanes={crossing.hasPedestrianLanes}
          />
        </CardContent>
        {/* {crossing.constructionNotice && (
          <CardFooter className="text-xs text-custom-grey rounded border-0">
            {crossing.constructionNotice}
          </CardFooter>
        )} */}
      </Card>
    </Link>
  );
}
