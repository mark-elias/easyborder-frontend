interface Props {
  status: string;
}

export function OperationalStatusBadge({ status }: Props) {
  const colorClass = getColorClass(status);

  return (
    <span className={`px-1 py-0.5 rounded uppercase text-sm ${colorClass}`}>
      {status}
    </span>
  );
}

function getColorClass(status: string): string {
  const s = status.toLowerCase();
  if (s === "n/a" || s === "lanes closed") return "bg-custom-red";
  if (s === "update pending") return "bg-custom-grey";
  if (s.includes("delay")) return "bg-custom-yellow";
  if (s === "no delay") return "bg-custom-green";
  return "bg-custom-grey";
}
