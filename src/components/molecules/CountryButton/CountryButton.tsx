"use client";

import { Button } from "@/components/ui/button";

interface Props {
  flag: string;
  name: string;
  onClick: () => void;
  className?: string;
  variant?:
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | null
    | undefined;
}

function CountryButton({ flag, name, onClick, className, variant }: Props) {
  return (
    <Button onClick={onClick} variant={variant} className={className}>
      <span>{flag}</span>
      <span>{name}</span>
    </Button>
  );
}

export default CountryButton;
