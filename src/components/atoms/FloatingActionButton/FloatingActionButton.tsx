import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onClick: () => void;
  label: string;
}

export function FloatingActionButton({ onClick, label }: Props) {
  return (
    <Button
      onClick={onClick}
      aria-label={label}
      className="fixed bottom-6 right-6 z-50 size-14 rounded-full shadow-lg
        hover:cursor-pointer hover:scale-105 transition-transform duration-200 text-custom-blue"
    >
      <CirclePlus className="size-7" />
    </Button>
  );
}
