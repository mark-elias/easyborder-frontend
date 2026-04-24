"use client";
// hooks
import { useRequireCountryAndCity } from "@/src/hooks/useRequireCountryAndCity";
import useCrossings from "@/src/hooks/useCrossings";

function CrossingsPage() {
  const { selectedCountry, selectedCity } = useRequireCountryAndCity();

  const {
    data: crossings,
    isLoading,
    error,
  } = useCrossings(selectedCountry, selectedCity);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        <div>Error: {error.message}</div>
        <div>
          Im currently setting up nginx, docker-compose, and SSL for https...
          stay tuned
        </div>
      </div>
    );

  return (
    <main className="p-5 min-h-screen">
      <section className="flex flex-col items-center justify-center border">
        <h3>Crossings for {selectedCity}</h3>
        <p>{selectedCountry}</p>
        <p>{selectedCity}</p>
        <ul className="">
          {crossings?.map((crossing) => (
            <li key={crossing._id}>{crossing.portName}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default CrossingsPage;
