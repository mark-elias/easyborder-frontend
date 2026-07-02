import type { Crossing } from "@/src/types";

interface Props {
  status: Crossing["portStatus"];
}

export function PortStatusBadge({ status }: Props) {
  const colorClass =
    status === "Open"
      ? "bg-custom-green"
      : status === "Closed"
        ? "bg-custom-red"
        : "bg-custom-grey";

  return (
    <span
      className={`px-1 py-0 rounded-xs uppercase text-xs text-black ${colorClass}`}
    >
      {status ?? "N/A"}
    </span>
  );
}
