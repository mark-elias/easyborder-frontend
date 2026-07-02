interface Props {
  status: string;
}

export function OperationalStatusBadge({ status }: Props) {
  const colorClass = getColorClass(status);

  return (
    <span className={`px-1 py-0 rounded uppercase text-xs ${colorClass}`}>
      {status}
    </span>
  );
}

function getColorClass(status: string): string {
  const s = status.toLowerCase();
  if (s === "n/a" || s === "lanes closed") return "bg-custom-red";
  if (s === "update pending") return "bg-custom-grey";
  if (s === "no delay") return "bg-custom-green";
  if (s.includes("delay")) return "bg-custom-yellow text-black";
  return "bg-custom-grey";
}
